
# VitePress 多语言自动识别与用户偏好记忆

本文档旨在详细说明如何在 VitePress 站点中实现一个智能的语言切换功能。该功能可以自动识别新用户的浏览器语言并跳转到对应版本，同时能记住老用户的手动选择，在下次访问时自动跳转。

## 功能目标

1.  **首次访问**：根据用户的浏览器 `navigator.language` 设定，自动跳转到相应的语言主页（例如，浏览器为英文的用户将从 `yoursite.com` 跳转到 `yoursite.com/en/`）。
2.  **用户选择记忆**：当用户通过语言切换器手动选择一个语言后（例如从中文切换到英文），该选择将被保存在浏览器的 `localStorage` 中。
3.  **后续访问**：当用户再次访问站点时，脚本会读取 `localStorage` 中的偏好设置，并直接将用户导航到他们上次选择的语言版本。

## 前提条件

此方案基于一个已经配置好国际化（i18n）的 VitePress 项目。您的 `docs/.vitepress/config.ts` 文件中应包含类似以下的 `locales` 配置：

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  // ...其他配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      // ...themeConfig
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/', // 官方建议添加
      // ...themeConfig
    }
  }
})
```

## 实现方法

核心实现需要通过扩展默认主题来注入客户端脚本。创建或编辑 `docs/.vitepress/theme/index.ts` 文件，并填入以下完整代码：

```typescript
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute();

    // 此函数处理页面首次加载时的所有逻辑
    const handleInitialLoad = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const LANG_STORAGE_KEY = 'preferred_lang';
      const DEFAULT_LANG = 'zh'; // 对应 root locale
      const EN_LANG = 'en';      // 对应 /en/ locale

      // 1. 决定用户的首选语言
      const getPreferredLanguage = () => {
        // 优先从 localStorage 读取已保存的偏好
        const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
        if (savedLang) return savedLang;

        // 如果没有，则根据浏览器语言判断
        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('en') ? EN_LANG : DEFAULT_LANG;
      };

      const preferredLang = getPreferredLanguage();
      const currentPath = window.location.pathname;
      const currentLang = currentPath.startsWith(`/${EN_LANG}/`) ? EN_LANG : DEFAULT_LANG;

      // 2. 如果当前语言与首选语言不符，则进行跳转
      if (preferredLang !== currentLang) {
        const pathWithoutLang = currentLang === EN_LANG
          ? currentPath.substring(EN_LANG.length + 1)
          : currentPath;

        const newPath = preferredLang === EN_LANG
          ? `/${EN_LANG}${pathWithoutLang}`.replace(`//`, '/')
          : pathWithoutLang || '/';

        window.location.replace(newPath);
        return; // 跳转后停止执行，防止逻辑冲突
      }

      // 3. 如果用户已在正确的页面，确保偏好被正确存储
      // 这对于没有发生跳转的首次访问至关重要
      localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    };

    onMounted(handleInitialLoad);

    // 此 watch 仅在用户通过链接切换语言时更新偏好
    watch(
      () => route.path,
      (newPath) => {
        if (typeof window !== 'undefined') {
          const LANG_STORAGE_KEY = 'preferred_lang';
          const DEFAULT_LANG = 'zh';
          const EN_LANG = 'en';
          const newLang = newPath.startsWith(`/${EN_LANG}/`) ? EN_LANG : DEFAULT_LANG;
          localStorage.setItem(LANG_STORAGE_KEY, newLang);
        }
      }
    );
  }
}
```

## 逻辑解析

### 1. 首次加载处理 (`onMounted`)

`onMounted` 钩子确保脚本在客户端页面挂载后执行。`handleInitialLoad` 函数是所有核心逻辑的起点：

- **获取偏好**：优先从 `localStorage` 中查找名为 `preferred_lang` 的键。如果找不到（说明是新用户），则检查 `navigator.language` 来判断浏览器语言。
- **判断与跳转**：比较“首选语言”和“当前URL所处的语言”。如果不匹配，立即计算出正确的 URL 并使用 `window.location.replace()` 进行跳转。`replace` 方法不会在浏览器历史中留下记录，用户点击后退不会陷入跳转循环。
- **存储偏好**：如果无需跳转（用户访问的 URL 刚好与其偏好匹配），脚本会调用 `localStorage.setItem()` 来保存或更新语言偏好。这对于处理新用户首次访问就进入正确语言页面的情况至关重要。

### 2. 后续导航监听 (`watch`)

`watch` 钩子会监听路由（即浏览器地址栏路径）的变化。

- 它的唯一职责是：当用户在站点内部**点击链接**从一个语言版本导航到另一个时（例如从 `/` 点击到 `/en/guide`），它会捕获到路径变化，并立即将新的语言（`en`）更新到 `localStorage` 中。
- 这个监听器保证了用户的**手动选择**能够被实时记录下来，供下一次访问时使用。

通过将“首次加载”和“后续导航”的逻辑分离，我们避免了循环跳转等问题，实现了一个健壮且用户体验良好的多语言站点。
