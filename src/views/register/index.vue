<template>
  <simple-layout class="login-page">
    <sign-wrapper title="欢迎注册" btn-text="立即注册" @btn-click="handleRegister">
      <template slot="form-content">
        <m-form
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
        </m-form>
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
import MForm from '@/components/module/m-form'

export default {
  components: {
    SimpleLayout,
    SignWrapper,
    MForm
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
      formItems: [
        {
          prop: 'username',
          rule: 'required|username',
          control: {
            attrs: {
              'prefix-icon': 'el-icon-user',
              placeholder: '请输入用户名'
            }
          }
        },
        {
          prop: 'user_type',
          control: {
            component: 'm-radio-group',
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
            attrs: {
              'prefix-icon': 'el-icon-lock',
              type: 'password',
              placeholder: '请输入密码'
            }
          }
        },
        {
          prop: 'password2',
          rule: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value !== this.registerForm.password) {
                    callback(new Error('两次输入不一致'))
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
      ]
    }
  },

  methods: {
    handleRegister() {
      this.$refs.registerRef.$refs['form'].validate(async valid => {
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
