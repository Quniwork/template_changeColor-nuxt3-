<template>
  <header class="page-header">
    <div id="header-fixed" class="header-fixed-wrap">
      <div class="ele-fixed-container">
        <div class="ele-fixed-inner">
          <div class="header-wrap">
            <div class="header-logo">
              <a href="#" class="ele-logo-wrap">
                <div class="ele-logo-img"></div>
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
                      <li v-for="(link, index) in apiData.customLinks" :key="index">
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
                <!-- 登入框 -->
                <div class="login-wrap">
                  <form method="POST">
                    <div class="login-left">
                      <label class="ele-login-unit">
                        <input
                          id="js-username"
                          title="请输入4-15个字元, 仅可输入英文字母以及数字的组合!!"
                          name="username"
                          type="text"
                          maxlength="15"
                          pattern="[a-zA-Z0-9]{4,15}"
                          required="required"
                          class="ele-login-input"
                          v-model="username"
                          @focus="handleFocus('username')"
                          @blur="handleBlur('username')"
                          @input="handleInput('username')"
                        />
                        <p class="ele-login-placeholder" :style="{ opacity: usernamePlaceholderOpacity }">账号</p>
                        <span class="ele-acc-unicod">@bin</span>
                      </label>
                      <label class="ele-login-unit">
                        <input
                          title="请填写 6-12 位大小写英数字"
                          :type="passwordType"
                          name="password"
                          autocomplete="off"
                          maxlength="12"
                          pattern="[a-zA-Z0-9]{6,12}"
                          required="required"
                          class="ele-login-input"
                          v-model="password"
                          @focus="handleFocus('password')"
                          @blur="handleBlur('password')"
                          @input="handleInput('password')"
                        />
                        <p class="ele-login-placeholder" :style="{ opacity: passwordPlaceholderOpacity }">密码</p>
                        <a href="#" class="ele-show-password black" @click.prevent="togglePasswordVisibility">
                          <svg v-if="isPasswordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"></path>
                          </svg>
                        </a>
                        <a href="#" title="忘记?" class="ele-forget-pw">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                            <path
                              d="M12.5-6A10.512,10.512,0,0,1,2-16.5,10.512,10.512,0,0,1,12.5-27,10.512,10.512,0,0,1,23-16.5,10.512,10.512,0,0,1,12.5-6Zm-1-7.015v1.633h1.685v-1.633Zm1.14-7.656h.085a1.6,1.6,0,0,1,1.684,1.531c.068.643-.4,1.313-1.378,1.99a2.74,2.74,0,0,0-1.327,2.4v.562h1.327v-.459a2.064,2.064,0,0,1,1.174-1.838c1.286-.812,1.9-1.757,1.837-2.807-.17-1.692-1.2-2.6-3.062-2.7q-.1,0-.207,0A3.484,3.484,0,0,0,9-18.985l1.48.357C10.777-19.983,11.5-20.671,12.64-20.671Z"
                              transform="translate(-2 27)"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </label>
                      <button type="submit" class="ele-login-submit">登入</button>
                      <a href="#" class="ele-join-btn">注册</a>
                    </div>
                  </form>
                </div>
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
    <Banner v-if="notFirst" />
    <News v-if="notFirst" />
  </header>
</template>

<script setup>
import { useApiData } from '~/composables/useApiData'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import Banner from '~/components/Banner.vue'
import News from '~/components/News.vue'

const { apiData } = useApiData()

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
    console.warn('Subnav image path is undefined, using default image')
    return '/image/default.png'; // 返回一个默认图片路径，防止 undefined 错误
  }
  return `/image/not-use/subnav/zh-cn/subnav_${img}_title.png`;
}

// 定义一个计算属性，用于判断路径是否为 '/first'
const notFirst = computed(() => route.path !== '/first')

// !登入表单
const username = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const usernamePlaceholderOpacity = ref(1)
const passwordPlaceholderOpacity = ref(1)

const handleFocus = (field) => {
  if (field === 'username' && username.value.trim() === '') {
    usernamePlaceholderOpacity.value = 0.5
  }
  if (field === 'password' && password.value.trim() === '') {
    passwordPlaceholderOpacity.value = 0.5
  }
}

const handleBlur = (field) => {
  if (field === 'username') {
    usernamePlaceholderOpacity.value = username.value.trim() === '' ? 1 : 0
  }
  if (field === 'password') {
    passwordPlaceholderOpacity.value = password.value.trim() === '' ? 1 : 0
  }
}

const handleInput = (field) => {
  if (field === 'username') {
    usernamePlaceholderOpacity.value = username.value.trim() !== '' ? 0 : 0.5
  }
  if (field === 'password') {
    passwordPlaceholderOpacity.value = password.value.trim() !== '' ? 0 : 0.5
  }
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'))
</script>
