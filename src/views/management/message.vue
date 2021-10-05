<template>
  <div class="management-message">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :fetch-data="getMessages"
      @add="handleAdd"
      @edit="handleEdit"
    />
    <message-edit-dialog ref="editDialogRef" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import MessageEditDialog from '@/components/message/message-edit-dialog'
import moment from 'moment'

export default {
  components: {
    MessageEditDialog,
    BaseTable
  },
  data() {
    return {
      columns: [
        {
          width: '140px',
          label: '发送方',
          prop: 'senderName'
        },
        {
          width: '140px',
          label: '接收方',
          prop: 'receiverName'
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

  computed: {
    filters() {
      return [
        {
          key: 'senderName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索发送方'
          }
        },
        {
          key: 'receiverName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索接收方'
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
      list.forEach(item => {
        item.senderName = item.Sender.realName
        item.receiverName = item.Receiver.realName
      })
      const newRes = {
        list: list,
        total: res.data.pagination && res.data.pagination.total
      }
      return newRes
    },
    handleAdd(vm) {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.tableThis = vm
      this.$refs.editDialogRef.outerRow = null
    },
    handleEdit(vm, row) {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.tableThis = vm
      this.$refs.editDialogRef.outerRow = row
    }
  }
}
</script>
