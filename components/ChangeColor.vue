<template>
  <div ref="changeColorBlock" class="changeColor-block">
    <!-- <div class="changeColor-edit">
      <button class="edit" @click="toggleEditMode">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
        </svg>
      </button>
    </div> -->
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
import { ref, onMounted, inject } from 'vue'
import html2canvas from 'html2canvas'; // 导入 html2canvas
import JSZip from 'jszip' // 导入 JSZip

// 主題狀態注入
const theme = inject('theme')
const isEditMode = ref(false); // 管理编辑模式的状态

// 切換編輯模式
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
  if (isEditMode.value) {
    addPickButtons();
  } else {
    removePickButtons();
  }
};

// 添加 pick-btn 和 pickColor-wrap
const addPickButtons = () => {
  const editableElements = document.querySelectorAll('[data-edit="true"]');

  editableElements.forEach(element => {
    // 如果沒有 pick-btn 則添加
    if (!element.querySelector('.pick-btn')) {
      const pickBtn = document.createElement('div');
      pickBtn.className = 'pick-btn';
      pickBtn.textContent = '選擇顏色';
      element.prepend(pickBtn); // 將 pick-btn 插入到元素內部的最前面

      // 添加 pickColor-wrap 並隱藏
      const pickColorWrap = document.createElement('div');
      pickColorWrap.className = 'pickColor-wrap';
      pickColorWrap.style.display = 'none';

      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.addEventListener('input', (event) => {
        const variable = `--color-${element.className.replace(/\s+/g, '-')}`;
        document.documentElement.style.setProperty(variable, event.target.value);
      });

      pickColorWrap.appendChild(colorInput);
      element.appendChild(pickColorWrap);

      // 點擊 pick-btn 時顯示 pickColor-wrap
      pickBtn.addEventListener('click', () => {
        pickColorWrap.style.display = 'block';
      });
    }
  });
};

// 移除 pick-btn 和 pickColor-wrap
const removePickButtons = () => {
  const pickButtons = document.querySelectorAll('.pick-btn');
  const pickColorWraps = document.querySelectorAll('.pickColor-wrap');

  pickButtons.forEach(pickBtn => pickBtn.remove());
  pickColorWraps.forEach(pickColorWrap => pickColorWrap.remove());
};

// 設置主題並更新 data-theme 屬性
const setTheme = (newTheme) => {
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
}

// 當組件掛載時，預設設置 data-theme 為 theme.value 的初始值
onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

// 當組件掛載時，初始化 colorPickers
const colorPickers = ref([]);
onMounted(() => {
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
});

const changeColorBlock = ref(null);

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

// 保存 CSS 文件的函数
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

// 保存图片示意图的函数
const saveImage = () => {
  const changeColorBlockElement = changeColorBlock.value;
  changeColorBlockElement.style.display = 'none'; // 隐藏 ChangeColor 区块

  html2canvas(document.body).then(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;

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
