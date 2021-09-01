<template>
  <section class="block-section">
    <div class="block-header">
      <h3 class="text-xl">{{ title }}</h3>
      <router-link class="link-btn" :to="url">
        <span>查看全部</span><i class="el-icon-arrow-right icon"></i>
      </router-link>
    </div>
    <div class="block-content">
      <slot name="block-content" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.block-section {
  .block-header {
    display: flex;
    align-items: center;
    margin-bottom: $gap-lg;
    .link-btn {
      margin-left: auto;
      font-size: 13px;
      padding: 4px 12px;
      border-radius: 9999px;
      color: $c-green-400;
      border: 1px solid $c-green-400;
      &:hover {
        color: $c-white;
        background-color: $c-green-400;
      }
      .icon {
        margin-left: 3px;
      }
    }
  }
}
</style>
