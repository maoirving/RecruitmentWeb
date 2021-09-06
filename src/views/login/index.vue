<template>
  <simple-layout class="login-page" :is-admin-type="isAdminType">
    <template slot="form-content">
      <el-form class="form-content" ref="form" :model="loginForm">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </simple-layout>
</template>

<script>
import SimpleLayout from '@/layout/simple-layout'

export default {
  components: {
    SimpleLayout
  },

  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  computed: {
    isAdminType() {
      return this.$route.name === 'AdminLogin' ? true : false
    }
  },

  created() {
    console.log(this.$route.name)
  }
}
</script>

<style lang="scss" scoped>
.login-page {
}
</style>
