<template>
  <div ref="changeColorBlock" class="changeColor-block">
    <div class="changeColor-edit-header">
      <div class="changeColor-edit-title">
        Edit template
      </div>
      <div class="changeColor-edit">
        <button v-if="!isEdit" @click="toggleEditMode" class="changeColor-edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fa-icon-edit"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M20.626 2.483a1.094 1.094 0 0 1 1.39 1.39l-.165.471l-.26.696l-.163.415l-.185.452l-.205.482l-.224.505l-.12.258c-.677 1.455-1.61 3.156-2.727 4.33c-1.065 1.12-2.673 2.153-3.96 2.886a5 5 0 0 1-1.36 4.557c-2.27 2.27-4.807 2.27-6.694 1.71c-1.43-.426-2.605-1.198-3.729-2.148a.394.394 0 0 1 .027-.624l.332-.237c.728-.53 1.479-1.182 1.658-2.08c.034-.166.055-.334.073-.502l.05-.507a6 6 0 0 1 .074-.504c.138-.689.43-1.471 1.137-2.18a5 5 0 0 1 4.557-1.36c.733-1.287 1.765-2.895 2.886-3.96c1.174-1.116 2.875-2.05 4.33-2.728l.513-.233l.25-.11l.482-.205l.664-.27l.576-.22l.59-.213zm-7.915 7.62c-.259.395-.505.798-.732 1.19a5 5 0 0 1 1.228 1.228c.392-.227.795-.473 1.19-.732l-.03-.067a3.3 3.3 0 0 0-.66-.93a3.4 3.4 0 0 0-.817-.603zm6.71-5.025c-.383.159-.799.34-1.228.54c-1.41.657-2.867 1.48-3.797 2.364a8 8 0 0 0-.47.493c.362.2.782.49 1.195.904c.414.413.704.833.904 1.195a8 8 0 0 0 .493-.47c.884-.93 1.707-2.388 2.364-3.797c.2-.43.38-.846.54-1.229M6 1a1 1 0 0 1 .898.56l.048.117l.13.378a3 3 0 0 0 1.684 1.8l.185.07l.378.129a1 1 0 0 1 .117 1.844l-.117.048l-.378.13a3 3 0 0 0-1.8 1.684l-.07.185l-.129.378a1 1 0 0 1-1.844.117l-.048-.117l-.13-.378a3 3 0 0 0-1.684-1.8l-.185-.07l-.378-.129a1 1 0 0 1-.117-1.844l.117-.048l.378-.13a3 3 0 0 0 1.8-1.684l.07-.185l.129-.378A1 1 0 0 1 6 1"></path></g></svg>
          Edit
        </button>
        <button v-else @click="toggleEditMode" class="changeColor-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="fa-icon-edit" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg>
          Close</button>
      </div>
    </div>
    <div class="changeColor-wrap" v-if="isEdit">
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
      <div class="changeColor-item-btn">
        <button @click="saveImageAndCss" class="changeColor-submit">保存示意圖與CSS</button>
        <button @click="savePackage" class="changeColor-submit">保存封包</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from 'vue';
import html2canvas from 'html2canvas'; // 导入 html2canvas
import JSZip from 'jszip' // 导入 JSZip

// 注入主題狀態
const theme = inject('theme');
const changeColorBlock = ref(null); // 绑定 changeColorBlock
const isEdit = ref(false)

// 切换编辑模式
const toggleEditMode = () => {
  isEdit.value = !isEdit.value
  updateBodyClass()
}

// 更新 body class
const updateBodyClass = () => {
  if (typeof window !== 'undefined') {
    if (isEdit.value) {
      document.body.classList.add('isEdit')
    } else {
      document.body.classList.remove('isEdit')
    }
  }
}

// 在组件挂载时，监听 body class 的变化
onMounted(() => {
  // 如果需要初始化时判断 isEdit 状态，可以在这里调用
  updateBodyClass()
})

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
const savePackage = async () => {
  const zip = new JSZip();
  const appTitle = getNuxtAppTitle();

  // 移除 body 上的 isEdit 类
  document.body.classList.remove('isEdit');

  let htmlContent = document.documentElement.outerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // 移除文档中 .changeColor-block 元素
  const changeColorElement = doc.querySelector('.changeColor-block');
  if (changeColorElement) {
    changeColorElement.remove();
  }

  // 处理 img 标签的 src，将绝对路径改为相对路径
  const imgTags = doc.querySelectorAll('img');
  const promises = [];

  imgTags.forEach((img) => {
    const imgUrl = img.src;
    const imgFilename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1); // 提取文件名

    // 修改 img 的 src 为相对路径
    img.src = `image/${imgFilename}`;

    // 下载图片并保存到 ZIP
    const promise = fetch(imgUrl)
      .then(response => response.blob())
      .then(blob => {
        zip.file(`image/${imgFilename}`, blob); // 保存到 ZIP
      });
    promises.push(promise);
  });

  // 处理内联样式中的 background-image
  const elementsWithBackground = doc.querySelectorAll('*[style*="background-image"]');
  
  elementsWithBackground.forEach((element) => {
    const style = element.getAttribute('style');
    const urlMatch = style.match(/url\(["']?(.*?)["']?\)/);
    
    if (urlMatch && urlMatch[1]) {
      const backgroundImageUrl = urlMatch[1];
      const imgFilename = backgroundImageUrl.substring(backgroundImageUrl.lastIndexOf('/') + 1); // 提取文件名

      // 替换 style 中的 background-image 路径为相对路径
      const newStyle = style.replace(backgroundImageUrl, `image/${imgFilename}`);
      element.setAttribute('style', newStyle);

      // 下载图片并保存到 ZIP
      const promise = fetch(backgroundImageUrl)
        .then(response => response.blob())
        .then(blob => {
          zip.file(`image/${imgFilename}`, blob); // 保存到 ZIP
        });
      promises.push(promise);
    }
  });

  // 等待所有图片下载完成
  await Promise.all(promises);

  // 更新后的 HTML 内容（已经调整了 img src 和 background-image）
  htmlContent = doc.documentElement.outerHTML;
  zip.file('index.html', htmlContent);

  // 生成并添加 CSS 文件
  const cssContent = generateCss();
  zip.file('style.css', cssContent);

  // 隐藏 changeColorBlock 元素并生成截图
  const changeColorBlockElement = changeColorBlock.value;
  changeColorBlockElement.style.display = 'none'; // 隐藏 ChangeColor 区块

  html2canvas(document.body).then(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
    const imgData = dataURL.split(',')[1]; // 去掉 data:image/jpeg;base64, 头部
    zip.file(`screenshot.jpg`, imgData, { base64: true });

    // 恢复显示 ChangeColor 区块
    changeColorBlockElement.style.display = '';

    // 恢复 body 上的 isEdit 类
    document.body.classList.add('isEdit');

    // 生成 ZIP 文件并触发下载
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${appTitle}.zip`;
      link.click();
    });
  }).catch(error => {
    console.error('Error generating screenshot:', error);
    // 确保发生错误时也恢复 body 上的 isEdit 类
    document.body.classList.add('isEdit');
  });
};
</script>
