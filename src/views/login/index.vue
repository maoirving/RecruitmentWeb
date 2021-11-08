<template>
  <simple-layout class="login-page">
    <sign-wrapper :title="title" btn-text="立即登录" @btn-click="handleLogin">
      <template slot="form-content">
        <base-form
          ref="loginFormRef"
          label-width="auto"
          :form-items="formItems"
          :form-data="loginForm"
        />
      </template>
      <template v-if="!isManagement" slot="tip">
        还没有账号？去<router-link class="text-link" to="/register">注册</router-link>
      </template>
      <template slot="popup">
        <Vcode :show="isShow" @success="success" @close="close" />
      </template>
    </sign-wrapper>
  </simple-layout>
</template>

<script>
import SimpleLayout from '@/layout/simple-layout'
import SignWrapper from '@/components/sign/sign-wrapper'
import BaseForm from '@/components/base/base-form'
import Vcode from 'vue-puzzle-vcode'
import { mapActions } from 'vuex'

export default {
  components: {
    SimpleLayout,
    SignWrapper,
    BaseForm,
    Vcode
  },

  data() {
    return {
      loginForm: {
        username: '',
        type: '',
        password: ''
      },

      formItems: [
        {
          prop: 'username',
          rule: 'required',
          control: {
            attrs: {
              'prefix-icon': 'el-icon-user',
              placeholder: '请输入用户名'
            }
          }
        },
        {
          prop: 'password',
          rule: 'required',
          control: {
            attrs: {
              'prefix-icon': 'el-icon-lock',
              placeholder: '请输入密码',
              'show-password': true
            }
          }
        }
      ],
      isShow: false
    }
  },

  computed: {
    isWorker() {
      return this.$route.name === 'Login'
    },

    isManagement() {
      return this.$route.name === 'ManagementLogin'
    },

    title() {
      const prefix = this.isManagement ? '管理员' : '欢迎'
      return prefix + '登录'
    },
    userType() {
      return this.isManagement ? 'admin' : 'worker'
    }
  },

  methods: {
    ...mapActions('user', ['login']),
    handleLogin() {
      this.$refs.loginFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.isShow = true
        this.$message.info('请先进行安全验证')
      })
    },
    async success() {
      this.isShow = false // 通过验证后，需要手动隐藏模态框
      this.loginForm.type = this.userType
      const type = this.isWorker ? 'user' : 'admin'
      this.$store
        .dispatch(`${type}/login`, this.loginForm)
        .then(() => {
          this.$message.success('登录成功')
          if (this.isWorker) {
            return this.$router.push('/home')
          }
          return this.$router.push('/management/job')
        })
        .catch(() => {
          this.$message.error('登录失败，请检查账号密码是否正确！')
        })
      // const res = await this.$axios.post('/users/check', this.loginForm)
      // if (!res.data.success) return this.$message.error('登录失败，请检查账号密码是否正确！')
      // this.$message.success('登录成功')
      // // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
      // //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
      // //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
      // window.sessionStorage.setItem('token', res.data.user.token)
      // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
      // if (this.isWorker) {
      //   return this.$router.push('/home')
      // }
      // return this.$router.push('/management/job')
    },

    close() {
      this.isShow = false
    }
  },

  mounted() {
    if (this.$route.params && this.$route.params.username) {
      this.loginForm.username = this.$route.params.username
    }
  }
}
</script>
