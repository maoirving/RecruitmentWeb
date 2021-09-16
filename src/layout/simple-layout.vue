<template>
  <div class="simple-layout">
    <main class="main">
      <div class="content-wrapper">
        <router-link to="/">
          <div class="image-hoder">
            <img :src="require('@/assets/images/logo.png')" alt="" />
          </div>
        </router-link>
        <h2 class="text-xl title text-center">{{ title }}</h2>
        <div class="form-wrapper">
          <slot name="form-content" />
        </div>
        <div class="btn-holder">
          <el-button type="primary" @click="handleClick">{{ btnText }}</el-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'login'
    },
    isAdminType: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      checked: false
    }
  },

  computed: {
    typeText() {
      return this.type === 'login' ? '登录' : '注册'
    },
    title() {
      let text = this.isAdminType ? '管理员' : '欢迎'
      return text + this.typeText
    },
    btnText() {
      return `立即${this.typeText}`
    }
  },

  methods: {
    handleClick() {
      this.$emit('btn-click')
      //   if (this.isAdminType) {
      //     this.$router.push('/admin')
      //     return
      //   }
      //   if (this.type === 'login') {
      //     this.$router.push('/home')
      //   } else {
      //     this.$router.push('/login')
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-layout {
  height: 100vh;
  .main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(141deg, #9fb8ad 0%, #42c4d3 51%, #40beec 75%);
  }
  .content-wrapper {
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
}
</style>
