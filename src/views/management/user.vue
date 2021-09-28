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
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import { userTypeOptions, sexOptions } from '@/utils/data-source'
import moment from 'moment'

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: [
        {
          label: '用户名',
          prop: 'username'
        },
        {
          label: '头像',
          prop: 'imageUrl'
        },
        {
          label: '角色',
          prop: 'type',
          formatter: optionFormatter(userTypeOptions, 'type')
        },
        {
          label: '真实姓名',
          prop: 'realName'
        },
        {
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
            click(scope) {
              console.log('重置密码')
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
          span: 4,
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
    handleAdd() {
      console.log('add')
    },
    handleEdit(row, vm, isEdit) {
      if (isEdit) {
        console.log('编辑', row.id)
        vm.reload()
      } else {
        console.log('查看')
      }
    }
  }
}
</script>

<style></style>
