<template>
  <div ref="changeColorBlock" class="changeColor-block">
    <div class="changeColor-wrap">
      <div class="changeColor-default">
        <button class="btn theme-dark"><i class="fa-solid fa-moon"></i></button>
        <button class="btn theme-light"><i class="fa-solid fa-sun-bright"></i></button>
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
      <button @click="saveImageAndCss" class="changeColor-submit">儲存示意圖與CSS</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import html2canvas from 'html2canvas'; // 导入 html2canvas

// 定义一个包含颜色选择器数据的数组
const colorPickers = ref([
  { label: '更改主色', variable: '--color-primary', value: '#0E77FF' },
  { label: '更改登入按鈕背景色', variable: '--color-login-button', value: '#2C88FF' },
  { label: '更改註冊按鈕背景色', variable: '--color-join-button', value: '#0EACFF' },
]);

const changeColorBlock = ref(null);

// 更新颜色的统一方法
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

// 保存图片示意图和 CSS 文件的函数
const saveImageAndCss = () => {
  const cssContent = generateCss();
  saveCss(cssContent);
  saveImage();
};
</script>
