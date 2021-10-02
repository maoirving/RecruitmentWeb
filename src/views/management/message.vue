<template>
  <div class="management-message">
    <base-table :columns="columns" :fetch-data="getMessages" @add="handleAdd" @edit="handleEdit" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import moment from 'moment'

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: [
        {
          label: '发送方',
          prop: 'senderId'
        },
        {
          label: '接收方',
          prop: 'receiverId'
        },
        {
          label: '消息内容',
          prop: 'content'
        },
        {
          label: '发送时间',
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
          label: '编辑',
          type: 'primary',
          events: {
            click(scope) {
              console.log('编辑')
            }
          }
        },
        {
          label: '删除',
          type: 'danger',
          events: {
            click(scope) {
              console.log('删除')
            }
          }
        }
      ]
    }
  },

  methods: {
    async getMessages(params = {}) {
      const res = await this.$axios.get('/messages', {
        params: params
      })
      const list = res.data.messages
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
