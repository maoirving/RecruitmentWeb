<template>
  <app-layout class="home-page">
    <el-card>
      <block-banner />
      <block-job />
      <block-company />
    </el-card>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import BlockJob from '@/components/blocks/block-job'
import BlockCompany from '@/components/blocks/block-company'
import BlockBanner from '@/components/blocks/block-banner.vue'

export default {
  name: 'Home',
  components: {
    AppLayout,
    BlockJob,
    BlockCompany,
    BlockBanner
  },
  data() {
    return {
      swiperOption: {
        slidePerView: 3,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
