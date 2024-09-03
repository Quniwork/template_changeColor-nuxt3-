<template>
  <div ref="changeColorBlock" class="changeColor-block">
    <div class="changeColor-wrap">
      <div class="changeColor-default">
        <div class="color-item" @click="setTheme('dark')" :class="{ active: theme === 'dark' }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path></svg>
          <span>Dark</span>
        </div>
        <div class="color-item" @click="setTheme('light')" :class="{ active: theme === 'light' }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg>
          <span>Light</span>
        </div>
      </div>
      <div
        class="changeColor-item"
        v-for="(color, index) in colorPickers"
        :key="index"
      >
        <label class="changeColor-title">{{ color.label }}</label>
        <div class="changeColor-btn">
          <span
            class="color"
            :style="{ backgroundColor: color.value }"
            @click="triggerColorPicker(index)"
          >
            <input
              type="color"
              :value="color.value"
              @input="updateColor(color.variable, $event.target.value, index)"
              ref="colorInput"
            />
          </span>
          <input
            type="text"
            v-model="color.value"
            class="changeColor-input"
            @input="updateColor(color.variable, color.value, index)"
          />
        </div>
      </div>
      <button @click="saveImageAndCss" class="changeColor-submit">保存示意圖與CSS</button>
      <button @click="savePackage" class="changeColor-submit">保存封包</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from 'vue';
import html2canvas from 'html2canvas'; // 导入 html2canvas
import JSZip from 'jszip' // 导入 JSZip

// 注入主題狀態
const theme = inject('theme');
const isEditMode = ref(false); // 管理编辑模式的状态
const changeColorBlock = ref(null); // 绑定 changeColorBlock

// colorPickers 初始值
const colorPickers = ref([]);

// 檢查是否在客戶端環境中
const isClient = typeof window !== 'undefined';

// 設置主題並更新 data-theme 屬性
const setTheme = async (newTheme) => {
  if (!isClient) return; // 確保只在客戶端執行

  theme.value = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);

  // 等待 DOM 更新後再更新 colorPickers 的顏色值
  await nextTick();

  colorPickers.value = [
    { label: '主要顏色', variable: '--color-primary', value: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() },
    { label: '主輔助顏色', variable: '--color-secondary', value: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() },
    { label: '次輔助顏色', variable: '--color-tertiary', value: getComputedStyle(document.documentElement).getPropertyValue('--color-tertiary').trim() },
    { label: '文字顏色', variable: '--color-primary-text', value: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-text').trim() },
    { label: '輔助文字顏色', variable: '--color-secondary-text', value: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-text').trim() },
    { label: '背景色', variable: '--color-primary-bg', value: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-bg').trim() },
    { label: '主輔助背景色', variable: '--color-secondary-bg', value: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-bg').trim() },
    { label: '次輔助背景色', variable: '--color-tertiary-bg', value: getComputedStyle(document.documentElement).getPropertyValue('--color-tertiary-bg').trim() },
    { label: '大廳背景色', variable: '--color-platform-bg', value: getComputedStyle(document.documentElement).getPropertyValue('--color-platform-bg').trim() },
    { label: 'Header背景色', variable: '--color-header-bg', value: getComputedStyle(document.documentElement).getPropertyValue('--color-header-bg').trim() },
    { label: 'Footer背景色', variable: '--color-footer-bg', value: getComputedStyle(document.documentElement).getPropertyValue('--color-footer-bg').trim() }
  ];
};

// 组件挂载时设置初始主题
if (isClient) {
  setTheme(theme.value);
}

// 更新颜色函数
const updateColor = (variable, value, index) => {
  document.documentElement.style.setProperty(variable, value);
  colorPickers.value[index].value = value; // 同步更新 colorPickers 中的颜色值
};

// 触发隐藏的颜色选择器
const triggerColorPicker = (index) => {
  const colorInput = document.querySelectorAll('input[type="color"]')[index];
  if (colorInput) {
    colorInput.click();
  }
};

// 生成 CSS 样式函数
const generateCss = () => {
  let css = '';
  colorPickers.value.forEach(color => {
    const labelComment = `/* ${color.label} */`;
    css += `${labelComment}\n${color.variable}: ${color.value};\n\n`;
  });
  return css;
};

// 获取环境变量中的标题
const getNuxtAppTitle = () => {
  const config = useRuntimeConfig();
  return config.public.NUXT_APP_TITLE || 'default-title';
};

// 保存 CSS 文件函数
const saveCss = (cssContent) => {
  const blob = new Blob([cssContent], { type: 'text/css' });
  const url = URL.createObjectURL(blob);

  const appTitle = getNuxtAppTitle();
  const link = document.createElement('a');
  link.href = url;
  link.download = `${appTitle}.css`;
  link.click();

  URL.revokeObjectURL(url);
};

// 保存图片示意图函数
const saveImage = () => {
  const changeColorBlockElement = changeColorBlock.value;
  changeColorBlockElement.style.display = 'none'; // 隐藏 ChangeColor 区块

  html2canvas(document.body).then(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;

    // 获取环境变量中的标题
    const appTitle = getNuxtAppTitle();
    link.download = `${appTitle}.jpg`;
    link.click();

    changeColorBlockElement.style.display = ''; // 恢复显示 ChangeColor 区块
  }).catch(error => {
    console.error('Error generating screenshot:', error);
  });
};

// 保存图片示意图和 CSS 文件
const saveImageAndCss = () => {
  const cssContent = generateCss();
  saveCss(cssContent);
  saveImage();
};

// 保存封包函数
const savePackage = async () => {
  const zip = new JSZip();
  const appTitle = getNuxtAppTitle();

  let htmlContent = document.documentElement.outerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const changeColorElement = doc.querySelector('.changeColor-block');
  if (changeColorElement) {
    changeColorElement.remove();
  }

  const imgTags = doc.querySelectorAll('img');
  const promises = [];

  imgTags.forEach((img) => {
    const imgUrl = img.src;
    const imgFilename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1); // 提取原始文件名

    const promise = fetch(imgUrl)
      .then(response => response.blob())
      .then(blob => {
        zip.file(`image/${imgFilename}`, blob); // 使用原始文件名
      });
    promises.push(promise);
  });

  await Promise.all(promises);

  htmlContent = doc.documentElement.outerHTML;
  zip.file('index.html', htmlContent);

  const cssContent = generateCss();
  zip.file('style.css', cssContent);

  const changeColorBlockElement = changeColorBlock.value;
  changeColorBlockElement.style.display = 'none'; // 隐藏 ChangeColor 区块

  html2canvas(document.body).then(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
    const imgData = dataURL.split(',')[1]; // 去掉 data:image/jpeg;base64, 头部
    zip.file(`screenshot.jpg`, imgData, { base64: true });

    changeColorBlockElement.style.display = '';

    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${appTitle}.zip`;
      link.click();
    });
  }).catch(error => {
    console.error('Error generating screenshot:', error);
  });
};
</script>
