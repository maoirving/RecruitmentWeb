<template>
  <div class="login-page">
    <div class="form-wrapper">
      <h2>欢迎登录</h2>
      <el-form ref="form" :model="loginForm">
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
        <el-form-item class="button-holder">
          <el-button type="primary">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0aa7a7;
  .form-wrapper {
    box-sizing: border-box;
    width: 36%;
    height: 50vh;
    padding: 40px 40px;
    border-radius: 8px;
    background-color: #fff;
    .button-holder {
      text-align: right;
    }
  }
}
</style>
