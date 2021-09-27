<template>
  <div class="aside-wrapper">
    <el-card>
      <div class="title-holder">
        <h3 class="text-lg title-text">
          {{ title }}
        </h3>
        <router-link v-if="link" class="text-link title-link" :to="link">
          <span>
            查看更多
          </span>
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </div>

      <div class="aside-content">
        <slot name="aside-content" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-wrapper {
  .title-holder {
    display: flex;
    align-items: center;
    padding-bottom: $gap;
    margin-bottom: $gap;
    border-bottom: $dashed-gray;
    .title-link {
      margin-left: auto;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .aside-content {
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: $gap-xs;
    padding-bottom: $gap-xs;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    &::-webkit-scrollbar-track {
      border-radius: 16px;
      background-color: #f3f4f5;
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 16px;
      background-color: #c1c1c1;
    }
  }
}
</style>
