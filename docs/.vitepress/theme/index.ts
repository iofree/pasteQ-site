import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { onMounted, onUnmounted } from 'vue'

export default {
  ...DefaultTheme,
  setup() {
    let cleanup: (() => void) | undefined;

    onMounted(() => {
      const dialog = document.createElement('dialog');
      dialog.className = 'screenshot-dialog';
      const screenshot = document.createElement('img');
      const close = document.createElement('button');
      close.type = 'button';
      close.textContent = '×';
      close.autofocus = true;
      close.addEventListener('click', () => dialog.close());
      dialog.append(screenshot, close);
      document.body.appendChild(dialog);
      let trigger: HTMLImageElement | null = null;

      const enlarge = (event: MouseEvent | KeyboardEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLImageElement) || !target.classList.contains('sub-screenshot')) return;
        if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        trigger = target;
        screenshot.src = target.currentSrc || target.src;
        screenshot.alt = target.alt;
        dialog.setAttribute('aria-label', target.alt);
        close.setAttribute('aria-label', document.documentElement.lang.startsWith('zh') ? '关闭截图' : 'Close screenshot');
        if (!dialog.open) dialog.showModal();
      };

      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('close', () => {
        if (trigger?.isConnected) trigger.focus();
      });
      document.addEventListener('click', enlarge);
      document.addEventListener('keydown', enlarge);
      cleanup = () => {
        document.removeEventListener('click', enlarge);
        document.removeEventListener('keydown', enlarge);
        dialog.remove();
      };
    });

    onUnmounted(() => cleanup?.());
  }
}
