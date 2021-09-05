<template>
  <div class="simple-layout">
    <div class="content-wrapper">
      <h2 class="text-xl title">{{ title }}</h2>
      <div class="form-wrapper">
        <el-form class="form-wrapper" ref="form" :model="loginForm">
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
          <el-form-item>
            <el-checkbox v-model="checked">
              <span> 我已阅读并同意</span>
              <a class="text-link" href="#"> 用户协议</a> 和
              <a class="text-link" href="#"> 隐私条款</a>
            </el-checkbox>
          </el-form-item>
        </el-form>
      </div>

      <div class="btn-holder">
        <el-button type="primary">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Stirng,
      default: 'login'
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

  computed:{
    title(){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .content-wrapper {
    box-sizing: border-box;
    width: 500px;
    padding: 40px 40px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
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
