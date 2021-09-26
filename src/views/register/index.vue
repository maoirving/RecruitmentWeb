<template>
  <simple-layout class="login-page">
    <sign-wrapper title="欢迎注册" btn-text="立即注册" @btn-click="handleRegister">
      <template slot="form-content">
        <base-form
          ref="registerRef"
          label-width="auto"
          :form-items="formItems"
          :form-data="registerForm"
        >
          <template slot="checked">
            <el-checkbox v-model="registerForm.checked">
              <span> 我已阅读并同意</span>
              <a class="text-link" href="#"> 用户协议</a> 和
              <a class="text-link" href="#"> 隐私条款</a>
            </el-checkbox>
          </template>
        </base-form>
      </template>
      <template slot="tip">
        已有账号？去<router-link class="text-link" to="/login">登录</router-link>
      </template>
    </sign-wrapper>
  </simple-layout>
</template>

<script>
import SimpleLayout from '@/layout/simple-layout'
import SignWrapper from '@/components/sign/sign-wrapper'
import BaseForm from '@/components/base/base-form'

export default {
  components: {
    SimpleLayout,
    SignWrapper,
    BaseForm
  },

  data() {
    return {
      registerForm: {
        username: '',
        type: 'worker',
        password: '',
        repeatPassword: '',
        checked: false
      },
      formItems: [
        {
          prop: 'username',
          rule: [
            {
              required: true,
              trigger: 'blur',
              validator: async (rule, value, callback) => {
                if (value) {
                  const isExist = await this.checkUsername()
                  if (isExist) {
                    callback(new Error('用户名已存在'))
                  } else {
                    callback()
                  }
                } else {
                  callback('必填')
                }
              }
            }
          ],
          control: {
            attrs: {
              'prefix-icon': 'el-icon-user',
              placeholder: '请输入用户名'
            }
          }
        },
        {
          prop: 'type',
          control: {
            component: 'base-radio-group',
            attrs: {
              options: [
                {
                  label: '我要找工作',
                  key: 'worker'
                },
                {
                  label: '我要招聘',
                  key: 'recruiter'
                }
              ]
            }
          }
        },
        {
          prop: 'password',
          rule: 'required|password',
          control: {
            component: 'base-password-input',
            attrs: {
              'prefix-icon': 'el-icon-lock',
              type: 'password',
              placeholder: '请输入密码'
            }
          }
        },
        {
          prop: 'repeatPassword',
          rule: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value !== this.registerForm.password) {
                    callback(new Error('两次密码输入不一致'))
                  } else {
                    callback()
                  }
                } else {
                  callback('必填')
                }
              }
            }
          ],
          control: {
            component: 'base-password-input',
            attrs: {
              'prefix-icon': 'el-icon-key',
              type: 'password',
              placeholder: '请再次输入密码'
            }
          }
        },
        {
          slot: 'checked',
          prop: 'checked',
          rule: [
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (
                  this.registerForm.username &&
                  this.registerForm.password &&
                  this.registerForm.repeatPassword &&
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
      ]
    }
  },

  methods: {
    async checkUsername() {
      const res = await this.$axios.post('/users/check', { username: this.registerForm.username })
      return res.data.success === true
    },

    handleRegister() {
      this.$refs.registerRef.$refs['form'].validate(async valid => {
        if (!valid) return
        const form = {
          username: this.registerForm.username,
          type: this.registerForm.type,
          password: this.registerForm.password
        }
        const res = await this.$axios.post('/users', form)
        if (!res.data.success) return this.$message.error('注册失败！')
        this.$message({
          type: 'success',
          message: '注册成功，请登录！'
        })
        this.$router.push({
          name: 'Login',
          params: {
            username: form.username
          }
        })
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
