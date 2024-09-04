<template>
  <div class="page-container">
    <section class="first-section-wrap section1">
      <div class="section-wrap">
        <div class="first-top-wrap">
          <div class="slider-wrap">
            <div class="ad-wrap">
              <div id="js-ele-slideshow1" class="ele-slideshow-wrap">
                <img src="/image/event01.png">
              </div>
            </div>
            <div class="first-promotion-warp">
              <a href="#" class="first-promotion-promotion" @mouseover="imgHover = 1" @mouseleave="imgHover = null">
                <img :src="imgHover === 1 ? '/image/lang/zh-cn/btn01_hover.png' : '/image/lang/zh-cn/btn01.png'" alt="Promotion 1">
              </a>
              <a href="#" class="first-promotion-promotion" @mouseover="imgHover = 2" @mouseleave="imgHover = null">
                <img :src="imgHover === 2 ? '/image/lang/zh-cn/btn02_hover.png' : '/image/lang/zh-cn/btn02.png'" alt="Promotion 2">
              </a>
            </div>
          </div>
          <CommonNews class="isFirst" />
        </div>
        <div class="first-hotgame-warp">
          <div class="hotgame-title">
            热门游戏<span>Hot Games</span>
          </div>
          <div class="hotgame-warp"
            :style="transformStyle"
            @mousedown="onMouseDown"
          >
            <div class="hotgame-item-warp">
              <div class="hotgame-item" v-for="(game, index) in apiData.hotgames" :key="index">
                <div class="hotgame-rank">
                  <img :src="'image/ic_crown0' + game.rank + '.png'" :title="'top' + game.rank" v-if="game.rank <= 3">
                  <span v-else>{{ game.rank }}</span>
                </div>
                <div class="hotgame-icon">
                  <img :src="game.icon">
                </div>
                <div class="hotgame-name">
                  <div class="hotgame-name-top">{{ game.nameTop }}</div>
                  <div class="hotgame-name-bottom">{{ game.nameBottom }}</div>
                </div>
                <div class="hotgame-number">
                  <span>{{ game.number }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="hotgame-control">
            <a
              href="#"
              class="control-btn"
              :class="{ active: isActive === 1 }"
              @click.prevent="setTransform(0, 1)"
            ></a>
            <a
              href="#"
              class="control-btn"
              :class="{ active: isActive === 2 }"
              @click.prevent="setTransform(-50, 2)"
            ></a>
          </div>
        </div>
      </div>
    </section>
    <section class="first-section-wrap section2">
      <div class="section-wrap">
        <div class="first-casino-wrap">
          <div class="casino-tab-wrap">
            <button
              class="tab"
              :class="{ active: activeTab === 'Casino' }"
              @click="activeTab = 'Casino'"
            >
              Casino
            </button>
            <button
              class="tab"
              :class="{ active: activeTab === 'Fishing' }"
              @click="activeTab = 'Fishing'"
            >
              Fishing
            </button>
            <button
              class="tab"
              :class="{ active: activeTab === 'Card game' }"
              @click="activeTab = 'Card game'"
            >
              Card game
            </button>
          </div>
          <!-- 动画过渡效果 -->
          <transition name="fade" mode="out-in">
            <div class="casino-wrap" :key="activeTab">
              <a
                href="#"
                class="casino-item"
                v-for="(game, index) in filteredGames"
                :key="index"
              >
                <div class="item-img">
                  <button class="item-btn">Play</button>
                  <img :src="game.image" :alt="game.name" />
                </div>
                <div class="item-name">
                  <div class="name">{{ game.name }}</div>
                  <div v-if="game.hot" class="hot">HOT</div>
                </div>
                <div class="item-platform">{{ game.platform }}</div>
              </a>
            </div>
          </transition>
        </div>
      </div>
    </section>
    <section class="first-section-wrap section3">
      <div class="section-wrap">
        <div class="first-live-wrap">
          <div class="live-wrap">
            <a href="#" class="live-item">
              <button class="item-btn">进入游戏</button>
              <div class="item-text">
                <div class="title">BB视讯</div>
                <div class="description">
                  <p>全球最佳视讯直播平台，真人荷官在线发牌，画面真实高清，给您亲临赌场的真实爽快感受！</p>
                  <p class="text-red">包桌百家乐・经典百家乐・竟咪百家乐</p>
                </div>
              </div>
              <img src="/image/btn_live01_text.png" class="img-text">
              <img src="/image/btn_live01.png">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="579px" height="271px"><path fill-rule="evenodd"  fill="currentColor" d="M20.000,49.1000 L559.000,0.000 C570.046,0.000 578.1000,8.954 578.1000,19.1000 L578.1000,251.000 C578.1000,262.046 570.046,270.1000 559.000,270.1000 L20.000,270.1000 C8.954,270.1000 0.000,262.046 0.000,251.000 L0.000,70.000 C0.000,58.954 8.954,49.1000 20.000,49.1000 Z"/></svg>
            </a>
            <a href="#" class="live-item" style="background-image: url('/image/btn_live02.png'); --color-first-live-line: #02AC63">
              <button class="item-btn">Play</button>
              <div class="item-text">
                <div class="title">AG视讯</div>
                <div class="description">
                  <p>实体赌场真人荷官现场发牌</p>
                </div>
              </div>
            </a>
            <a href="#" class="live-item" style="background-image: url('/image/btn_live03.png'); --color-first-live-line: #F5B443">
              <button class="item-btn">Play</button>
              <div class="item-text">
                <div class="title">DB视讯</div>
                <div class="description">
                  <p>网上体验亲临赌场的刺激</p>
                </div>
              </div>
            </a>
            <a href="#" class="live-item" style="background-image: url('/image/btn_live04.png'); --color-first-live-line: #3E56E1">
              <button class="item-btn">Play</button>
              <div class="item-text">
                <div class="title">MG视讯</div>
                <div class="description">
                  <p>给你身临其境的真实感受</p>
                </div>
              </div>
            </a>
            <a href="#" class="live-item" style="background-image: url('/image/btn_live05.png'); --color-first-live-line: #45DDF6">
              <button class="item-btn">Play</button>
              <div class="item-text">
                <div class="title">BG视讯</div>
                <div class="description">
                  <p>最美荷官在线互动</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="first-section-wrap section4">
      <div class="section-wrap">
        <div class="first-mob-wrap">
          <div class="mob-left-wrap">
              <div class="title">
                体验极致 手机投注APP
              </div>
              <div class="description">
                原生APP，便捷登录、操作简单、界面一目了然、游戏畅通无阻、丰富的游戏品类、24小时多平台无缝应用体验。指尖App无处不在，带您开启掌上精彩！
              </div>
              <div class="download">
                <div class="download-qrcode">
                  <img src="/image/not-use/lang/zh-cn/qrcode_d.png">
                  <p>扫码下载App<br>iOS & Android</p>
                </div>
                <div class="download-h5">
                  <img src="/image/first_h5.png">
                  <p>无需下载，扫码直接访问<br><span class="text-primary">web.bbinpartner.com</span></p>
                </div>
              </div>
          </div>
          <div class="mob-right-wrap">
            <img src="/image/bg_mobile.png">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  defineProps(['apiData']);
  const { apiData } = useApiData()

  const imgHover = ref(null)

  // 热门游戏左右滑动
  const isActive = ref(1)
  const transformStyle = ref('transform: translateX(0);')

  function setTransform(translateX, btnIndex) {
    transformStyle.value = `transform: translateX(${translateX}%);`
    isActive.value = btnIndex
  }

  let startX = 0
  let initialTransform = 0
  let dragging = false

  function onMouseDown(event) {
    startX = event.clientX
    initialTransform = isActive.value === 1 ? 0 : -50
    dragging = true

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(event) {
    if (!dragging) return
    const deltaX = event.clientX - startX

    // 拖动过程中实时更新位置
    const newTransform = initialTransform + (deltaX / window.innerWidth) * 100
    transformStyle.value = `transform: translateX(${newTransform}%);`
  }

  function onMouseUp(event) {
    dragging = false
    const deltaX = event.clientX - startX

    // 根据拖动的方向和距离决定是切换到下一个还是回到当前
    if (deltaX < -50) {
      // 向左拖动超过阈值，显示第二个区域
      setTransform(-50, 2)
    } else if (deltaX > 50) {
      // 向右拖动超过阈值，显示第一个区域
      setTransform(0, 1)
    } else {
      // 如果拖动距离不够大，恢复原位置
      setTransform(initialTransform, isActive.value)
    }

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  // 游戏入口
  const games = ref([])
  const activeTab = ref('Casino');

  watch(
    () => apiData.value.games,
    (newGames) => {
      // console.log('apiData.games:', newGames)
      if (newGames) {
        games.value = newGames
      }
    },
    { immediate: true }
  )

  // 计算属性，用于根据 activeTab 筛选游戏
  const filteredGames = computed(() => {
    return games.value.filter(game => game.category === activeTab.value)
  })
</script>