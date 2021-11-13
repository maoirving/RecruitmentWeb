<template>
  <base-dialog
    dialog-width="50%"
    title="修改密码"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
  >
    <base-form
      slot="dialog-content"
      label-width="94px"
      ref="passwordFormRef"
      :form-items="formItems"
      :form-data="passwordForm"
    />
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'

export default {
  components: {
    BaseDialog,
    BaseForm
  },

  props: {},

  data() {
    return {
      dialogVisible: false,
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

  methods: {
    handleClose() {
      this.$refs.passwordFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.passwordFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认修改密码？', { type: 'warning' })
          .then(async () => {
            const res = await this.$axios.put('/users/info', {
              password: this.passwordForm.newPassword
            })
            if (!res.data.success) {
              return this.$message.error('修改失败，请重试！')
            }
            this.$message.success('密码修改成功！')
            this.handleClose()
          })
          .catch(() => {})
      })
    }
  }
}
</script>
