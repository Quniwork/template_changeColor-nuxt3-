<template>
  <div class="mainnav-wrap">
    <nav class="ele-navbar">
      <ul>
        <li
          v-for="(item, index) in navItems.filter(item => item.class !== 'morenav')"
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
                    <a :href="subItem.pn_link" :title="subItem.pn_name" class="ele-navbar-sublink">
                      <span class="ele-subnab-icon" :style="{ backgroundImage: `url('https://web.bbinpartner.com/images/subnav/${subItem.pn_link}/${subItem.pn_logo}.png')` }"></span>
                      <p class="ele-subnab-title">{{ subItem.pn_name }}</p>
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['apiData'])

// 用于追踪当前 hover 的导航项目索引
const hoverIndex = ref(null)

// 控制 ele-morenav-container 的显示和隐藏
const showMoreNav = ref(false)

// 判断当前链接是否处于 active 状态
const route = useRoute()
const isActive = (link) => route.path === `/${link}`

// 获取子菜单图片路径的函数
const getSubNavImage = (img) => {
  if (!img) {
    return '/image/default.png' // 返回一个默认图片路径，防止 undefined 错误
  }
  return `/image/not-use/subnav/zh-cn/subnav_${img}_title.png`
}

// 安全地获取 navItems，如果 apiData 或 navItems 未定义，则返回空数组
const navItems = computed(() => {
  return props.apiData?.navItems || []
})
</script>
