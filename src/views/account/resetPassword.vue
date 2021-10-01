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
          rule: 'required',
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

  methods: {
    onSubmit() {
      this.$refs.passwordFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认修改密码？', { type: 'warning' })
          .then(() => {
            this.$message.success('密码修改成功！')
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
