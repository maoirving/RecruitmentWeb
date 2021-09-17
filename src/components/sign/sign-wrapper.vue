<template>
  <div class="sign-wrapper">
    <router-link to="/home">
      <div class="image-hoder">
        <img :src="require('@/assets/images/logo.png')" alt="" />
      </div>
    </router-link>
    <h2 class="text-xl title text-center">{{ title }}</h2>
    <div class="form-wrapper">
      <slot name="form-content" />
    </div>
    <p class="tip">
      <slot name="tip" />
    </p>
    <div class="btn-holder">
      <el-button type="primary" @click="handleClick">{{ btnText }}</el-button>
    </div>
    <slot name="popup" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    btnText: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  methods: {
    handleClick() {
      this.$emit('btn-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 560px;
  padding: 40px 40px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  .image-hoder {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 50%;
    // box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
    img {
      width: 88%;
    }
  }
  .title {
    margin-bottom: $gap-lg;
  }
  .form-wrapper {
    .el-checkbox ::v-deep {
      color: inherit;
      font-weight: 400;
      &.is-checked .el-checkbox__label {
        color: inherit;
      }
    }
  }
  .btn-holder {
    text-align: right;
  }
}
</style>
