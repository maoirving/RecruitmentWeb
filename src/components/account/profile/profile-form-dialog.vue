<template>
  <el-dialog
    class="awesome-scrollbar profile-dialog"
    title="个人信息修改"
    width="40%"
    :center="true"
    v-bind="$attrs"
    destroy-on-close
    :before-close="handleClose"
    @closed="closed"
  >
    <base-form ref="profileFormRef" :form-items="formItems" :form-data="profileForm" />
    <div slot="footer" class="text-right">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleEdit">修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BaseForm from '@/components/base/base-form'

export default {
  components: {
    BaseForm
  },

  props: {},

  data() {
    return {
      profileForm: {},
      options: [
        {
          label: '男',
          key: '男'
        },
        {
          label: '女',
          key: '女'
        }
      ],
      formItems: [
        {
          label: '用户名',
          prop: 'username',
          rule: 'required|username'
        },
        {
          label: '姓名',
          prop: 'realName',
          rule: 'required'
        },
        {
          label: '性别',
          prop: 'sex',
          control: {
            component: 'base-radio-group',
            attrs: {
              options: [
                {
                  label: '男',
                  key: '男'
                },
                {
                  label: '女',
                  key: '女'
                }
              ]
            }
          }
        },
        {
          label: '出生日期',
          prop: 'birthday',
          control: {
            component: 'el-date-picker',
            attrs: {
              type: 'date',
              placeholder: '请选择日期'
            }
          }
        },
        {
          label: '手机号码',
          prop: 'phoneNumber',
          rule: 'phone'
        },
        {
          label: '电子邮箱',
          prop: 'email',
          rule: 'email'
        },
        {
          label: '当前住址',
          prop: 'currentAddress'
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.$confirm('填写内容不会保存，确认关闭？', { type: 'warning' })
        .then(() => {
          this.$emit('close-dialog')
        })
        .catch(() => {})
    },

    closed() {
      this.$refs.profileFormRef.$refs['form'].resetFields()
    },

    handleEdit() {
      this.$refs.profileFormRef.$refs['form'].validate(async valid => {
        if (!valid) return
        this.$confirm('确认修改？', { type: 'warning' })
          .then(async () => {
            const res = await this.$axios.put(`/users/${this.profileForm.id}`, {
              username: this.profileForm.username,
              realName: this.profileForm.realName,
              imageUrl: this.profileForm.imageUrl,
              sex: this.profileForm.sex,
              phoneNumber: this.profileForm.phoneNumber,
              email: this.profileForm.email
            })
            this.$message.success('修改成功！')
            this.$emit('reload')
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-dialog {
  .el-radio {
    margin-right: $gap-sm;
  }
}
</style>
