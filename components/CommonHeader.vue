<template>
  <header class="page-header">
    <div id="header-fixed" class="header-fixed-wrap">
      <div class="ele-fixed-container">
        <div class="ele-fixed-inner">
          <div class="header-wrap">
            <div class="header-logo">
              <a href="#" class="ele-logo-wrap">
                <img :src="currentImage" class="ele-logo-img">
              </a>
            </div>
            <div class="header-right">
              <div class="header-right-top">
                <!-- 美东时间 -->
                <div class="est-timing">
                  <span>美东时间 : </span>
                  <span>2024/08/26 - 02:56:23</span>
                </div>
                <!-- 自订连结 -->
                <div class="top-link-wrap">
                  <div class="ele-custom-link-wrap">
                    <ul>
                      <li class="ele-custom-link" v-for="(link, index) in apiData.customLinks" :key="index">
                        <a :href="link.link">{{ link.title }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 语系 -->
                <div class="lang-wrap">
                  <div class="ele-lang-wrap">
                    <div title="繁体中文" data-title="zh-tw" class="ele-lang-option"></div>
                    <div title="简体中文" data-title="zh-cn" class="ele-lang-option"></div>
                    <div title="English" data-title="en" class="ele-lang-option"></div>
                  </div>
                </div>
                <CommonHeaderMem :apiData="apiData" />
              </div>
              <div class="header-right-bottom">
                <div class="mainnav-wrap">
                  <nav class="ele-navbar">
                    <ul>
                      <li
                        v-for="(item, index) in apiData.navItems.filter(item => item.class !== 'morenav')"
                        @mouseleave="hoverIndex = null"
                        :key="index"
                        :class="['ele-navbar-link-wrap', 'ele-navbar-link-' + item.class]"
                        @mouseover="hoverIndex = index"
                      >
                        <!-- 如果 link 为空，渲染静态文本 -->
                        <template v-if="!item.link">
                          <span class="ele-navbar-link">
                            <p class="ele-navbar-title">{{ item.title }}</p>
                          </span>
                        </template>
                        <!-- 否则，渲染 router-link -->
                        <template v-else>
                          <router-link
                            :to="item.link ? `/${item.link}` : '/'"
                            class="ele-navbar-link"
                            :class="{ active: isActive(item.link) }"
                          >
                            <p class="ele-navbar-title">{{ item.title }}</p>
                          </router-link>
                        </template>
                        <transition name="fade">
                          <nav v-if="hoverIndex === index && item.subItems.length" class="ele-subnav">
                            <div class="ele-subnav-container">
                              <img :src="getSubNavImage(item.img)" class="ele-subnav-title" alt="Subnav Image">
                              <ul>
                                <li
                                  v-for="(subItem, subIndex) in item.subItems"
                                  :key="subIndex"
                                  class="ele-subnav-link-wrap"
                                >
                                  <a :href="subItem.link" :title="subItem.title" class="ele-navbar-sublink">
                                    <span class="ele-subnab-icon" :style="{ backgroundImage: `url('${subItem.img || ''}')` }"></span>
                                    <p class="ele-subnab-title">{{ subItem.title }}</p>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </nav>
                        </transition>
                      </li>
                    </ul>
                    <ul class="ele-morenav">
                      <li
                        v-for="(item, index) in apiData.navItems.filter(item => item.class === 'morenav')"
                        :key="index"
                        class="ele-morenav-link-wrap"
                        @mouseover="showMoreNav = true"
                        @mouseleave="showMoreNav = false"
                      >
                        <a href="#" class="ele-morenav-sublink-title">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18">
                            <path d="M12,18H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0h9a3,3,0,0,1,3,3V15A3,3,0,0,1,12,18ZM3.637,8a.556.556,0,0,0-.367.142A.694.694,0,0,0,3,8.679V8.69a.809.809,0,0,0,.112.391l3.8,3.889a.873.873,0,0,0,.565.247.886.886,0,0,0,.565-.247l3.8-3.892a.809.809,0,0,0,.113-.39V8.676a.7.7,0,0,0-.271-.535A.563.563,0,0,0,11.335,8H11.3a.986.986,0,0,0-.574.276l-3.16,3.167L4.231,8.28A.97.97,0,0,0,3.637,8Z" fill="currentcolor"/>
                          </svg>
                        </a>
                        <transition name="fade">
                          <ul v-if="showMoreNav" class="ele-morenav-container">
                            <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                              <a :href="subItem.link" class="ele-morenav-sublink">{{ subItem.title }}</a>
                            </li>
                          </ul>
                        </transition>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonBanner v-if="notFirst"/>
    <CommonNews v-if="notFirst" />
  </header>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
defineProps(['apiData']);

// 根據 theme 的值, 顯示對應的LOGO配色
const theme = inject('theme')
const currentImage = computed(() => {
  return theme.value === 'dark'
    ? '/image/logo.png'
    : '/image/logo_light.png'
})

// 用於追蹤當前 hover 的導航項目索引
const hoverIndex = ref(null)

// 控制 ele-morenav-container 的顯示和隱藏
const showMoreNav = ref(false)

// 判斷當前鏈接是否處於 active 狀態
const route = useRoute()
const isActive = (link) => route.path === `/${link}`

// 獲取子菜單圖片路徑的函數
const getSubNavImage = (img) => {
  if (!img) {
    return '/image/default.png'; // 返回一個默認圖片路徑，防止 undefined 錯誤
  }
  return `/image/not-use/subnav/zh-cn/subnav_${img}_title.png`;
}

// 判斷路徑是否為 '/first', 給予顯示banner及news components
const notFirst = computed(() => route.path !== '/first')
</script>
