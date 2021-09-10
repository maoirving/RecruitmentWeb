<template>
  <simple-layout type="register" class="login-page" @btn-click="handleRegister">
    <template slot="form-content">
      <el-form class="form-content" ref="registerRef" :model="registerForm" :rules="registerRules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="registerForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="userType">
          <el-radio-group v-model="registerForm.user_type">
            <el-radio label="worker" border>我要找工作</el-radio>
            <el-radio label="recruiter" border>我要招聘</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input
            prefix-icon="el-icon-key"
            v-model="registerForm.password2"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="registerForm.checked">
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
        user_type: 'worker',
        password: '',
        password2: '',
        checked: false
      },
      // 这是表单的验证规则对象
      registerRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        checked: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (
                this.registerForm.username &&
                this.registerForm.password &&
                this.registerForm.password2 &&
                !value
              ) {
                callback(new Error('请先勾选此项'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },

  methods: {
    handleRegister() {
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return
        const form = {
          username: this.registerForm.username,
          user_type: this.registerForm.user_type,
          password: this.registerForm.password
        }
        const { data: res } = await this.$axios.post('users', form)
        if (res.meta.status !== 201) return this.$message.error('注册失败！')
        this.$message({
          type: 'success',
          message: '注册成功，请登录！'
        })
        this.$router.push('/login')
      })
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
