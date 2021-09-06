<template>
  <simple-layout type="register" class="login-page">
    <template slot="form-content">
      <el-form class="form-content" ref="form" :model="registerForm">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="registerForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="registerForm.userType">
            <el-radio label="1" border>我要找工作</el-radio>
            <el-radio label="2" border>我要招聘</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-key"
            v-model="password2"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">
            <span> 我已阅读并同意</span>
            <a class="text-link" href="#"> 用户协议</a> 和
            <a class="text-link" href="#"> 隐私条款</a>
          </el-checkbox>
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
      registerForm: {
        username: '',
        password: '',
        userType: '1'
      },
      password2: '',
      checked: false
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  .form-content {
  }
}
::v-deep .el-checkbox {
  color: inherit;
  font-weight: 400;
}
::v-deep .el-checkbox.is-checked .el-checkbox__label {
  color: inherit !important;
}
</style>
