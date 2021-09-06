<template>
  <section class="block-section block-banner-wrapper">
    <!-- <swiper class="block-swiper" :options="swiperOption">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <div class="slide-card">
          <div class="image-holder">
            <img :src="image.imageUrl" alt="" />
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination" slot="pagination" />
    </swiper> -->
    <el-carousel :interval="3000" type="card" height="300px">
      <el-carousel-item class="block-swiper" v-for="(image, index) in images" :key="index">
        <div class="slide-card">
          <div class="image-holder">
            <img :src="image.imageUrl" alt="" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      swiperOption: {
        spaceBetween: 8,
        speed: 500,
        autoplay: true,
        loop: true,
        loopAdditionalSlides: 3,
        effect: 'coverflow',
        slidesPerView: 2.2,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }
      },
      images: [
        {
          imageUrl:
            'https://img.alicdn.com/imgextra/i2/6000000004030/O1CN01QjQl901fdmqFx1qIj_!!6000000004030-0-octopus.jpg'
        },
        {
          imageUrl: 'https://a1.alicdn.com/assets/p4p-fallback/mm_12852562_1778064_13670999.jpg'
        },
        {
          imageUrl: 'https://a1.alicdn.com/assets/p4p-fallback/mm_12852562_1778064_13674396.jpg'
        },
        {
          imageUrl: 'https://gtms03.alicdn.com/tps/i3/TB1gXd1JXXXXXapXpXXvKyzTVXX-520-280.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.block-banner-wrapper {
  .block-swiper {
    .slide-card {
      .image-holder {
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
