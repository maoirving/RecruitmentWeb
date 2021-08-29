<template>
  <div class="register-page">
    <div class="form-wrapper">
      <h2>欢迎注册</h2>
      <el-form ref="form" :model="registerForm">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="registerForm.username"
          />
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
            suffix-icon="el-icon-open"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-key"
            v-model="password2"
            type="password"
            suffix-icon="el-icon-open"
            placeholder="请再次输入密码"
          />
        </el-form-item>

        <el-form-item class="button-holder">
          <el-button type="primary">立即注册</el-button>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <span>已有账号？去</span>
        <router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        userType: '1'
      },
      password2: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0aa7a7;
  .form-wrapper {
    box-sizing: border-box;
    width: 36%;
    // height: 50vh;
    padding: 40px 40px;
    border-radius: 8px;
    background-color: #fff;
    .button-holder {
      text-align: right;
    }
  }
}
</style>
