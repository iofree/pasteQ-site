import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute();

    // This function handles the logic for the initial page load.
    const handleInitialLoad = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const LANG_STORAGE_KEY = 'preferred_lang';
      const DEFAULT_LANG = 'zh';
      const EN_LANG = 'en';

      // 1. Determine the user's preferred language.
      const getPreferredLanguage = () => {
        const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
        if (savedLang) return savedLang;

        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('en') ? EN_LANG : DEFAULT_LANG;
      };

      const preferredLang = getPreferredLanguage();
      const currentPath = window.location.pathname;
      const currentLang = currentPath.startsWith(`/${EN_LANG}/`) ? EN_LANG : DEFAULT_LANG;

      // 2. If the user is on the wrong page, redirect them.
      if (preferredLang !== currentLang) {
        const pathWithoutLang = currentLang === EN_LANG
          ? currentPath.substring(EN_LANG.length + 1)
          : currentPath;

        const newPath = preferredLang === EN_LANG
          ? `/${EN_LANG}${pathWithoutLang}`.replace(`//`, '/')
          : pathWithoutLang || '/';

        window.location.replace(newPath);
        return; // Stop execution after issuing a redirect.
      }

      // 3. If the user is on the correct page, ensure the preference is stored.
      // This is crucial for the first visit where no redirect was needed.
      localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    };

    onMounted(() => {
      handleInitialLoad();
      setupScreenshotEnlarge();
    });

    // This watcher ONLY updates the preference when the user clicks a link
    // to navigate between language versions AFTER the initial load.
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

    // 设置截图点击放大功能
    const setupScreenshotEnlarge = () => {
      if (typeof window === 'undefined') return;

      const addClickHandlers = () => {
        const subScreenshots = document.querySelectorAll('.sub-screenshot');
        
        subScreenshots.forEach(img => {
          // 移除之前的事件监听器（如果有的话）
          img.removeEventListener('click', handleScreenshotClick);
          // 添加新的事件监听器
          img.addEventListener('click', handleScreenshotClick);
        });
      };

      const handleScreenshotClick = (event) => {
        const img = event.target;
        const isEnlarged = img.classList.contains('enlarged');

        if (isEnlarged) {
          // 恢复原始大小
          img.classList.remove('enlarged');
          removeOverlay();
        } else {
          // 放大显示
          img.classList.add('enlarged');
          createOverlay();
        }
      };

      const createOverlay = () => {
        // 移除已存在的遮罩层
        removeOverlay();
        
        const overlay = document.createElement('div');
        overlay.className = 'screenshot-overlay';
        overlay.addEventListener('click', () => {
          const enlargedImg = document.querySelector('.sub-screenshot.enlarged');
          if (enlargedImg) {
            enlargedImg.classList.remove('enlarged');
          }
          removeOverlay();
        });
        
        document.body.appendChild(overlay);
        
        // 触发显示动画
        setTimeout(() => {
          overlay.classList.add('show');
        }, 10);
      };

      const removeOverlay = () => {
        const overlay = document.querySelector('.screenshot-overlay');
        if (overlay) {
          overlay.classList.remove('show');
          setTimeout(() => {
            overlay.remove();
          }, 300);
        }
      };

      // 初始设置
      setTimeout(addClickHandlers, 100);
      
      // 监听路由变化，重新设置事件监听器
      const observer = new MutationObserver(() => {
        setTimeout(addClickHandlers, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    };
  }
}