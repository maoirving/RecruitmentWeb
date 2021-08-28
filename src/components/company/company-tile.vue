<template>
  <div class="company-tile">
    <div class="company-tile-header">
      <div class="image-holder">
        <img :src="company.imageUrl" alt="" />
      </div>
    </div>
    <div class="company-tile-body">
      <h4 class="plain-tile">
        {{ company.name }}
      </h4>
      <p>{{ description }}</p>
    </div>
    <div class="company-tile-footer">
      <router-link class="link" :to="`company/detail/${company.id}`">
        <span>了解更多</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    description() {
      return `${this.company.financingStage} ｜ ${this.company.category} ｜ ${this.company.staffCount}`
    }
  }
}
</script>

<style lang="scss" scoped>
.company-tile {
  padding: 18px 12px;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.3);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
  &-header {
    .image-holder {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 80%;
      }
    }
  }
  &-body {
  }
  &-footer {
    text-align: right;
    .link {
      color: #0aa7a7;
    }
  }
}
</style>
