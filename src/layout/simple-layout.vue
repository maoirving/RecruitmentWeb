<template>
  <div class="simple-layout">
    <main class="main">
      <slot />
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
    isManagementType: {
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
      let text = this.isManagementType ? '管理员' : '欢迎'
      return text + this.typeText
    },
    btnText() {
      return `立即${this.typeText}`
    }
  },

  methods: {
    handleClick() {
      this.$emit('btn-click')
      //   if (this.isManagementType) {
      //     this.$router.push('/management')
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
}
</style>
