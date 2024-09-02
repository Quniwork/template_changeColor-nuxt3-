<template>
  <footer class="page-footer">
    <div class="footer-wrap">
      <div class="footer-top-wrap">
        <div class="top-logo-wrap">
          <div class="title">游戏提供商</div>
          <img src="/image/not-use/white.png" width="96px">
          <a href="#"><img src="/image/not-use/ublogo/white.png" width="162px"></a>
          <img src="/image/footer_img1.png">
        </div>
        <div class="top-pay-wrap">
          <div class="title">支付渠道</div>
          <img src="/image/footer_img2.png">
        </div>
      </div>
      <div class="footer-middle-wrap">
        <div class="title">博彩牌照认证</div>
        <div class="middle-img">
          <img src="/image/footer_img3.png">
        </div>
        <div class="middle-text">
          <p>我们在越来越热的网络博彩市场中，不断地求新求变，寻找最新的创意，秉持最好的服务。以带给客户高品质的服务、产品、娱乐，是我们的企业永恒宗旨。</p>
        </div>
      </div>
      <div class="footer-bottom-wrap">
        <div class="copyright">Copyright © BBIN Reserved</div>
        <div class="bottom-link-wrap">
          <ul>
            <li v-for="(link, index) in apiData.footerLinks" :key="index">
              <a :href="link.link">{{ link.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { useApiData } from '~/composables/useApiData'
  const { apiData } = useApiData()
</script>