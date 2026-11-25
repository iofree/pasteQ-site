<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const locale = computed(() => english.value ? 'en' : 'zh')
const copy = computed(() => english.value ? {
  label: 'Mac & iOS',
  clipboard: 'Find what you copied.',
  clipboardLabel: 'CLIPBOARD HISTORY',
  launcher: 'Open your next app.',
  launcherLabel: 'APP LAUNCHER · MAC ONLY',
  clipboardAlt: 'PasteQ clipboard window with search, groups, saved reply examples and keyboard hints',
  launcherAlt: 'PasteQ Mac app launcher with its search field, eight example apps and keyboard hints',
  caption: 'From a saved reply to your next app, keep your hands on the keyboard. Click a screenshot to explore.',
  enlarge: 'Enlarge screenshot',
} : {
  label: 'Mac & iOS',
  clipboard: '找回复制过的内容。',
  clipboardLabel: '剪贴板历史',
  launcher: '打开下一个应用。',
  launcherLabel: '应用启动器 · Mac 专属',
  clipboardAlt: 'PasteQ 剪贴板完整窗口，展示搜索、分组、示例常用回复与底部快捷键提示',
  launcherAlt: 'PasteQ Mac 应用启动器完整窗口，展示搜索框、八个示例应用与底部键盘提示',
  caption: '找回复制内容，打开常用应用，双手继续留在键盘上。点击截图可放大。',
  enlarge: '放大截图',
})
</script>

<template>
  <section class="product-hero" :aria-label="english ? 'Clipboard and Mac app launcher' : '剪贴板与 Mac 应用启动器'">
    <div class="product-hero-topline"><span>{{ copy.label }}</span><span>⌥ C <span aria-hidden="true">/</span> ⌥ Space</span></div>
    <div class="product-windows">
      <figure>
        <figcaption><span>{{ copy.clipboardLabel }}</span><strong>{{ copy.clipboard }}</strong></figcaption>
        <img :src="`/images/screenshots/clipboard-demo-${locale}.webp`" :alt="copy.clipboardAlt" width="1466" height="880" fetchpriority="high" class="feature-screenshot product-window" role="button" tabindex="0" :aria-label="`${copy.enlarge}: ${copy.clipboardAlt}`" :data-full-src="`/images/screenshots/clipboard-demo-${locale}.png`">
      </figure>
      <figure>
        <figcaption><span>{{ copy.launcherLabel }}</span><strong>{{ copy.launcher }}</strong></figcaption>
        <img :src="`/images/screenshots/launcher-${locale}.webp`" :alt="copy.launcherAlt" width="2560" height="1760" fetchpriority="high" class="feature-screenshot product-window" role="button" tabindex="0" :aria-label="`${copy.enlarge}: ${copy.launcherAlt}`" :data-full-src="`/images/screenshots/launcher-${locale}.png`">
      </figure>
    </div>
    <p class="product-hero-caption">{{ copy.caption }} <a :href="english ? '/en/guide/getting-started#app-launcher' : '/guide/getting-started#app-launcher'">{{ english ? 'Enable the launcher in Settings →' : '先在设置中开启启动器 →' }}</a></p>
  </section>
</template>
