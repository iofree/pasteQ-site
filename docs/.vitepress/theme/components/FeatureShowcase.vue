<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

defineProps<{ type: 'back-tap' | 'source-filter' }>()
const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const locale = computed(() => english.value ? 'en' : 'zh')
const copy = computed(() => english.value ? {
  copy: 'Copy something worth keeping',
  sample: '100 Century Ave, Pudong, Shanghai',
  copyLabel: 'Copy',
  sampleLabel: 'An address, a reply, a link.',
  tap: 'Back Tap to capture it',
  tapHint: 'Run your configured shortcut.',
  reuse: 'Pick it from Pinned',
  reuseHint: 'Insert it with the PasteQ keyboard. Reuse it next time.',
  notificationAlt: 'Illustration of the iPhone Back Tap system banner running Save to PasteQ',
  keyboardAlt: 'PasteQ keyboard with Pinned selected and the same saved address inserted into a text field; example content',
  caption: 'Workflow illustration; tap the keyboard image to enlarge. Keyboard images use a screenshot base with example content. Set up the shortcut and keyboard first; keep automatic pinning enabled.',
  mac: 'On Mac, start with the source app',
  macHint: 'Choose a source, then search within its records.',
  macAlt: 'PasteQ Mac source filter menu with PasteQ selected and Finder, Google Chrome and Lark available',
  iphone: 'On iPhone, find synced records',
  iphoneHint: 'Open the filter beside Search to choose a source.',
  iphoneAlt: 'PasteQ iPhone Source App sheet showing Google Chrome, Lark and other sources from synced records',
  sourceCaption: 'Source filters on Mac and iPhone, cropped from the Chinese interface. Tap an image to enlarge. Source apps are identified on Mac; synced records keep their source.',
  enlarge: 'Enlarge screenshot',
} : {
  copy: '复制一条，留着再用',
  sample: '上海市浦东新区世纪大道100号',
  copyLabel: '复制',
  sampleLabel: '一个地址、一段回复、一个链接。',
  tap: '轻点背面，主动收集',
  tapHint: '触发已经绑定的 PasteQ 快捷指令。',
  reuse: '调出键盘，从已固定点选',
  reuseHint: '填入后接着编辑，下次还可以再用。',
  notificationAlt: 'iPhone 轻点背面运行“存入 PasteQ”快捷指令的系统提示局部',
  keyboardAlt: 'PasteQ 扩展键盘选中“已固定”，点选保存的地址后填入上方输入框，内容为示例',
  caption: '操作示意，键盘图可点击放大；键盘使用截图底图与示例内容合成。需先配置快捷指令和键盘，并保留默认开启的“自动固定”。',
  mac: 'Mac：记得来源，就从来源找',
  macHint: '选中来源应用，再搜索其中的记录。',
  macAlt: 'PasteQ Mac 来源筛选菜单，当前选中 PasteQ，可选择访达、Google Chrome、Lark 等来源应用',
  iphone: 'iPhone：同步的记录也能按来源找',
  iphoneHint: '打开搜索框旁的筛选入口，选择来源应用。',
  iphoneAlt: 'PasteQ iPhone“来源App”筛选面板，可按 Google Chrome、Lark 等来源查找同步的记录',
  sourceCaption: 'Mac 与 iPhone 实际界面局部，点击图片可放大。来源应用由 Mac 识别，同步后的记录保留来源信息。',
  enlarge: '放大截图',
})
</script>

<template>
  <figure class="feature-showcase" :class="type">
    <div v-if="type === 'back-tap'" class="capture-flow">
      <div class="capture-step">
        <div class="capture-visual copy-visual">
          <div class="sample-text">
            <span class="copy-label">{{ copy.copyLabel }}</span>
            <span class="text-selection">{{ copy.sample }}</span>
          </div>
        </div>
        <div class="step-heading"><span class="step-number">01</span><strong>{{ copy.copy }}</strong></div>
        <p>{{ copy.sampleLabel }}</p>
      </div>
      <div class="capture-step">
        <div class="capture-visual tap-visual">
          <svg class="phone-back" viewBox="0 0 180 220" fill="none" aria-hidden="true">
            <rect x="38" y="8" width="108" height="204" rx="24" fill="#fce2dc" stroke="#ae6658" stroke-width="2" />
            <rect x="49" y="20" width="37" height="49" rx="12" fill="#efc2b7" />
            <circle cx="60" cy="33" r="7" fill="#684a46" />
            <circle cx="74" cy="55" r="7" fill="#684a46" />
            <circle cx="92" cy="126" r="35" stroke="#d14f39" stroke-width="2" opacity=".3" />
            <circle cx="92" cy="126" r="23" stroke="#d14f39" stroke-width="2" opacity=".6" />
            <path d="M89 155V123a7 7 0 0 1 14 0v19l8-3a8 8 0 0 1 10 6l4 22c1 10-5 20-16 20h-8c-6 0-11-3-14-8l-13-21a7 7 0 0 1 11-8l4 5Z" fill="#fff8f5" stroke="#ae6658" stroke-width="2" />
          </svg>
          <img :src="`/images/screenshots/back-tap-notification-${locale}.webp`" :alt="copy.notificationAlt" width="770" height="253" loading="lazy" decoding="async" class="tap-notification">
        </div>
        <div class="step-heading"><span class="step-number">02</span><strong>{{ copy.tap }}</strong></div>
        <p>{{ copy.tapHint }}</p>
      </div>
      <div class="capture-step">
        <div class="capture-visual keyboard-visual">
          <img :src="`/images/screenshots/back-tap-keyboard-${locale}.webp`" :alt="copy.keyboardAlt" width="1000" height="749" loading="lazy" decoding="async" class="feature-screenshot" role="button" tabindex="0" :aria-label="`${copy.enlarge}: ${copy.keyboardAlt}`">
        </div>
        <div class="step-heading"><span class="step-number">03</span><strong>{{ copy.reuse }}</strong></div>
        <p>{{ copy.reuseHint }}</p>
      </div>
    </div>
    <div v-else class="source-comparison">
      <div class="source-panel">
        <div class="source-heading"><span class="platform-label">macOS</span><strong>{{ copy.mac }}</strong><p>{{ copy.macHint }}</p></div>
        <img src="/images/screenshots/source-filter-mac.webp" :alt="copy.macAlt" width="465" height="626" loading="lazy" decoding="async" class="feature-screenshot source-menu mac-menu" role="button" tabindex="0" :aria-label="`${copy.enlarge}: ${copy.macAlt}`">
      </div>
      <div class="source-panel">
        <div class="source-heading"><span class="platform-label">iPhone</span><strong>{{ copy.iphone }}</strong><p>{{ copy.iphoneHint }}</p></div>
        <img src="/images/screenshots/source-filter-iphone.webp" :alt="copy.iphoneAlt" width="804" height="983" loading="lazy" decoding="async" class="feature-screenshot source-menu iphone-menu" role="button" tabindex="0" :aria-label="`${copy.enlarge}: ${copy.iphoneAlt}`">
      </div>
    </div>
    <figcaption>{{ type === 'back-tap' ? copy.caption : copy.sourceCaption }}</figcaption>
  </figure>
</template>

<style scoped>
.feature-showcase {
  container-type: inline-size;
  margin: 28px 0;
}

.capture-flow,
.source-comparison {
  display: grid;
  gap: 20px;
}

.capture-flow {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.capture-step,
.source-panel {
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
}

.capture-visual {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 230px;
  margin-bottom: 22px;
  border-radius: 12px;
  background: #faece6;
}

.sample-text {
  position: relative;
  width: 84%;
  padding: 24px 16px;
  border-radius: 10px;
  background: #fff;
  color: #2c2930;
  box-shadow: 0 8px 24px #713c2510;
  font-size: 17px;
  line-height: 1.8;
}

.text-selection {
  background: #dceafa;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.copy-label {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 18px;
  border-radius: 8px;
  background: #28262b;
  color: #fff;
  font-size: 13px;
}

.phone-back {
  width: 155px;
  height: 190px;
  margin-top: 30px;
}

.tap-notification {
  position: absolute;
  top: 12px;
  width: 80%;
  max-width: 245px;
  height: auto;
  border-radius: 999px;
}

.keyboard-visual {
  padding: 10px;
  background: #e5eaf2;
}

.keyboard-visual img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.step-heading {
  display: flex;
  align-items: baseline;
  gap: 9px;
  line-height: 1.6;
}

.step-number {
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 600;
}

.capture-step p,
.source-heading p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.source-comparison {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.source-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.source-heading {
  width: 100%;
  margin-bottom: 24px;
}

.source-heading strong,
.platform-label {
  display: block;
}

.platform-label {
  margin-bottom: 10px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
}

.source-menu {
  width: auto;
  max-width: 100%;
  height: 420px;
  object-fit: contain;
  border-radius: 12px;
}

.feature-screenshot {
  cursor: zoom-in;
}

.feature-screenshot:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

figcaption {
  margin-top: 14px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.8;
}

@container (max-width: 700px) {
  .capture-flow,
  .source-comparison {
    grid-template-columns: 1fr;
  }

  .capture-visual {
    height: 230px;
  }

  .sample-text {
    max-width: 290px;
  }

  .keyboard-visual img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .source-menu {
    height: auto;
    max-height: 420px;
  }
}

@container (min-width: 480px) and (max-width: 700px) {
  .capture-step,
  .source-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 24px;
  }

  .capture-visual {
    grid-row: 1 / 3;
    height: 210px;
    margin-bottom: 0;
  }

  .step-heading {
    align-self: end;
  }

  .capture-step p {
    grid-column: 2;
    align-self: start;
  }

  .source-heading {
    margin-bottom: 0;
  }

  .source-menu {
    justify-self: center;
    max-height: 360px;
  }
}
</style>
