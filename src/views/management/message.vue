<template>
  <div class="management-message">
    <base-table :columns="columns" :data="messages" :actions="actions" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: [
        {
          label: '消息名称',
          prop: 'name'
        },
        {
          label: '消息类别',
          prop: 'type'
        },
        {
          label: '消息主体',
          prop: 'financingStage'
        },
        {
          label: '用户',
          prop: 'address'
        },
        {
          label: '消息内容',
          prop: 'legalRepresentative'
        },
        {
          label: '发送时间',
          prop: 'sendTime'
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
      ],
      messages: []
    }
  },

  methods: {
    getMessages() {
      const message = {
        name: '面试邀请',
        type: '面试邀请',
        financingStage: '已上市',
        address: '厦门思明区厦门市软件园望海路8号楼1楼',
        legalRepresentative: '张某人',
        sendTime: '2011-02-21'
      }
      this.messages = Array(10).fill(message)
    }
  },

  created() {
    this.getMessages()
  }
}
</script>

<style></style>
