<template>
  <div class="management-user">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :fetch-data="getUsers"
      :extra-actions="actions"
      @add="handleAdd"
      @edit="handleEdit"
    />
    <user-edit-dialog ref="editDialogRef" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import { userTypeOptions, sexOptions } from '@/utils/data-source'
import UserEditDialog from '@/components/user/user-edit-dialog'
import moment from 'moment'

export default {
  components: {
    BaseTable,
    UserEditDialog
  },
  data() {
    const vm = this
    return {
      columns: [
        {
          label: '用户名',
          prop: 'username'
        },
        {
          width: '90px',
          label: '角色',
          prop: 'type',
          formatter: optionFormatter(userTypeOptions, 'type')
        },
        {
          width: '90px',
          label: '真实姓名',
          prop: 'realName'
        },
        {
          width: '80px',
          label: '性别',
          prop: 'sex'
        },
        {
          label: '出生日期',
          prop: 'birthday',
          formatter() {
            return row => {
              return moment(row.createdAt)
                .utcOffset(0)
                .format('YYYY-MM-DD')
            }
          }
        },
        {
          label: '手机号码',
          prop: 'phoneNumber'
        },
        {
          label: '电子邮箱',
          prop: 'email'
        },
        {
          label: '注册时间',
          prop: 'createdAt',
          formatter() {
            return row => {
              return moment(row.createdAt)
                .utcOffset(0)
                .format('YYYY-MM-DD HH:mm')
            }
          }
        }
      ],
      actions: [
        {
          label: '重置密码',
          type: 'success',
          events: {
            click({ row }) {
              const password = '123456'
              vm.$confirm(`确认将密码重置为${password}？`, { type: 'warning' })
                .then(async () => {
                  const res = await vm.$axios.put(`/users/${row.id}`, {
                    password: password
                  })
                  if (!res.data.success) {
                    return vm.$message.error('重置失败，请重试！')
                  }
                  vm.$message.success('重置成功！')
                  this.reload()
                })
                .catch(() => {})
            }
          }
        }
      ]
    }
  },

  computed: {
    filters() {
      return [
        {
          key: 'type',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '用户角色'
          },
          options: userTypeOptions
        },
        {
          key: 'sex',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '性别'
          },
          options: sexOptions
        },
        {
          key: 'realName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索用户'
          }
        }
      ]
    }
  },

  methods: {
    async getUsers(params = {}) {
      const res = await this.$axios.get('/users', {
        params: params
      })
      const list = res.data.users
      const newRes = {
        list: list,
        total: res.data.pagination && res.data.pagination.total
      }
      return newRes
    },
    handleAdd(vm) {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.outerThis = vm
      this.$refs.editDialogRef.outerData = null
    },
    handleEdit(vm, row) {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.outerThis = vm
      this.$refs.editDialogRef.outerData = row
    }
  }
}
</script>

<style></style>
