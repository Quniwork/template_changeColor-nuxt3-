<template>
  <div ref="changeColorBlock" class="changeColor-block">
    <!-- <div class="changeColor-edit">
      <button class="edit">
        edit
      </button>
    </div> -->
    <div class="changeColor-wrap">
      <div class="changeColor-default">
        <div class="color-item" @click="setTheme('dark')" :class="{ active: theme === 'dark' }">
          Dark
        </div>
        <div class="color-item" @click="setTheme('light')" :class="{ active: theme === 'light' }">
          Light
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
import { ref, onMounted, inject, nextTick } from 'vue'
import html2canvas from 'html2canvas'; // 导入 html2canvas
import JSZip from 'jszip' // 导入 html2canvas

// 主題狀態注入
const theme = inject('theme')

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
    { label: '輔助顏色', variable: '--color-secondary', value: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() },
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

// 組件初次加載時設置初始主題
if (isClient) {
  setTheme(theme.value);
}

// 組件初次加載時設置初始主題
setTheme(theme.value);

// 更新顏色的函數
const updateColor = (variable, value, index) => {
  document.documentElement.style.setProperty(variable, value);
  colorPickers.value[index].value = value; // 同步更新 colorPickers 中的顏色值
};

// 触发隐藏的颜色选择器
const triggerColorPicker = (index) => {
  const colorInput = document.querySelectorAll('input[type="color"]')[index];
  if (colorInput) {
    colorInput.click();
  }
};

// 生成 CSS 样式的函数
const generateCss = () => {
  let css = '';
  colorPickers.value.forEach(color => {
    css += `${color.variable}: ${color.value};\n`;
  });
  return css;
};

// 获取环境变量中的标题
const getNuxtAppTitle = () => {
  const config = useRuntimeConfig();
  return config.public.NUXT_APP_TITLE || 'default-title';
};


// 保存 CSS 文件的函数
const saveCss = (cssContent) => {
  const blob = new Blob([cssContent], { type: 'text/css' });
  const url = URL.createObjectURL(blob);

  // 获取环境变量中的标题
  const appTitle = getNuxtAppTitle();
  const link = document.createElement('a');
  link.href = url;
  link.download = `${appTitle}.css`;
  link.click();

  URL.revokeObjectURL(url);
};


// 保存图片示意图的函数
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


// 保存封包
const savePackage = async () => {
  const zip = new JSZip();
  const appTitle = getNuxtAppTitle();

  // 获取当前HTML内容并创建DOM对象
  let htmlContent = document.documentElement.outerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // 移除 ChangeColor 组件的 HTML 内容
  const changeColorElement = doc.querySelector('.changeColor-block');
  if (changeColorElement) {
    changeColorElement.remove();
  }

  // 查找所有图片并下载到 image 文件夹
  const imgTags = doc.querySelectorAll('img');
  const promises = [];

  imgTags.forEach((img, index) => {
    const imgUrl = img.src;
    const imgFilename = `image${index + 1}.jpg`; // 图片文件名
    img.src = `image/${imgFilename}`; // 替换为本地路径

    const promise = fetch(imgUrl)
      .then(response => response.blob())
      .then(blob => {
        zip.file(`image/${imgFilename}`, blob);
      });
    promises.push(promise);
  });

  // 等待所有图片下载完成
  await Promise.all(promises);

  // 生成并保存修改后的HTML内容为index.html
  htmlContent = doc.documentElement.outerHTML;
  zip.file('index.html', htmlContent);

  // 生成 CSS 文件
  const cssContent = generateCss();
  zip.file('style.css', cssContent);

  // 生成图片示意图
  const changeColorBlockElement = changeColorBlock.value;
  changeColorBlockElement.style.display = 'none'; // 隐藏 ChangeColor 区块

  html2canvas(document.body).then(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
    const imgData = dataURL.split(',')[1]; // 去掉 data:image/jpeg;base64, 头部
    zip.file(`screenshot.jpg`, imgData, { base64: true });

    // 恢复显示 ChangeColor 区块
    changeColorBlockElement.style.display = '';

    // 生成 ZIP 文件并触发下载
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
