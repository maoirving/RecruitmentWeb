<template>
  <div class="resetPassword-wrapper">
    <base-form ref="passwordFormRef" :form-items="formItems" :form-data="passwordForm" />
    <div class="text-right">
      <el-button type="primary" size="small" @click="onSubmit">修改</el-button>
    </div>
  </div>
</template>

<script>
import BaseForm from '@/components/base/base-form'
import { mapState } from 'vuex'

export default {
  components: {
    BaseForm
  },

  data() {
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      },
      formItems: [
        {
          label: '旧密码',
          prop: 'oldPassword',
          rule: [
            {
              required: true,
              trigger: 'blur',
              validator: async (rule, value, callback) => {
                if (value) {
                  const res = await this.$axios.post('/users/check', {
                    userId: this.userId,
                    password: value
                  })
                  if (res.data.success) {
                    callback()
                  } else {
                    callback('密码错误，请重试')
                  }
                } else {
                  callback('必填')
                }
              }
            }
          ],
          control: {
            attrs: {
              type: 'password',
              placeholder: '请输入旧密码',
              'show-password': true
            }
          }
        },
        {
          label: '新密码',
          prop: 'newPassword',
          rule: 'required|password',
          control: {
            attrs: {
              type: 'password',
              placeholder: '请设置新密码',
              'show-password': true
            }
          }
        },
        {
          label: '确认密码',
          prop: 'repeatPassword',
          rule: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value !== this.passwordForm.newPassword) {
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
            attrs: {
              type: 'password',
              placeholder: '请再次输入新密码',
              'show-password': true
            }
          }
        }
      ]
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    })
  },

  methods: {
    onSubmit() {
      this.$refs.passwordFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认修改密码？', { type: 'warning' })
          .then(async () => {
            const res = await this.$axios.put(`/users/${this.userId}`, {
              password: this.passwordForm.newPassword
            })
            if (!res.data.success) {
              return this.$message.error('修改失败，请重试！')
            }
            this.$message.success('密码修改成功！')
            this.$refs.passwordFormRef.$refs['form'].resetFields()
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.resetPassword-wrapper {
  width: 66%;
}
</style>
