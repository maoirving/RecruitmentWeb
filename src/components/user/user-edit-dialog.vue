<template>
  <base-dialog
    dialog-width="40%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
    :disabled="disabled"
  >
    <base-form
      slot="dialog-content"
      label-width="94px"
      ref="userFormRef"
      :form-items="formItems"
      :form-data="userForm"
      :disabled="disabled"
    />
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { sexOptions, userTypeOptions } from '@/utils/data-source'
import moment from 'moment'

export default {
  components: {
    BaseDialog,
    BaseForm
  },

  props: {
    isProfileType: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialogVisible: false,
      outerData: null,
      outerThis: null,
      jobOptions: [],
      userOptions: [],
      userForm: {
        id: '',
        imageUrl: '',
        username: '',
        realName: '',
        type: '',
        sex: '',
        birthday: '',
        phoneNumber: '',
        email: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerData)
        if (row) {
          this.userForm = Object.assign(
            this.userForm,
            pick(row, [
              'id',
              'imageUrl',
              'username',
              'realName',
              'type',
              'sex',
              'birthday',
              'phoneNumber',
              'email'
            ])
          )
        }
      }
    }
  },

  computed: {
    isEdit() {
      return this.outerData && this.outerData.id !== ''
    },
    disabled() {
      return this.outerData && this.outerData.status
    },
    dialogTitle() {
      if (this.isProfileType) {
        return '修改个人信息'
      }
      return this.isEdit
        ? this.disabled
          ? '查看用户'
          : '编辑用户'
        : '新增用户'
    },

    options() {
      return sexOptions
    },

    formItems() {
      const vm = this
      const items = [
        {
          label: '头像',
          prop: 'imageUrl',
          control: {
            component: 'base-upload',
            attrs: {
              limit: 2 * 1024 * 1024,
              tip: '图片限制2M以内',
              name: 'image'
            },
            events: {
              change(value) {
                vm.userForm.imageUrl = value
              }
            }
          }
        },
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
          rule: 'required',
          control: {
            component: 'base-radio-group',
            attrs: {
              options: sexOptions
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
        }
      ]
      if (!this.isProfileType) {
        items.splice(3, 0, {
          label: '用户类型',
          prop: 'type',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              options: userTypeOptions
            }
          }
        })
      }
      return items
    }
  },

  methods: {
    handleClose() {
      this.userForm = {
        id: '',
        imageUrl: '',
        username: '',
        realName: '',
        type: '',
        sex: '',
        birthday: '',
        phoneNumber: '',
        email: ''
      }
      this.$refs.userFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.userFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        const operation = this.isEdit ? '修改' : '创建'
        const tipText = this.isEdit ? '' : '（初始密码为123456）'
        const confirmText = this.isProfileType
          ? '确认修改个人信息？'
          : `确认${operation}该用户？${tipText}`
        this.$confirm(confirmText, { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveUser()
            if (isSuccessful) {
              this.$message.success(`${operation}成功`)
              this.outerThis.reload()
              this.handleClose()
            } else {
              this.$message.error(`${operation}失败，请重试`)
            }
          })
          .catch(() => {})
      })
    },
    async saveUser() {
      const userId = this.userForm.id
      const user = omit(this.userForm, ['id'])
      const params = omitBy(user, val => val === '')
      if (params.birthday) {
        params.birthday = moment(params.birthday)
          .utcOffset(0)
          .format('YYYY-MM-DD')
      }
      if (!this.isProfileType) {
        params.password = '123456'
      }
      if (!this.isEdit) {
        const res = await this.$axios.post(`/users`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/users/info`, params)
        return editRes.data.success
      }
    }
  }
}
</script>
