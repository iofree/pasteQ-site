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

    onMounted(handleInitialLoad);

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
  }
}