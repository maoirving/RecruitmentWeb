<template>
  <div class="management-interview">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :fetch-data="getInterviews"
      @add="handleAdd"
      @edit="handleEdit"
    />
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
          label: '面试id',
          prop: 'id'
        },
        {
          label: '公司名称',
          prop: 'companyName'
        },
        {
          label: '面试岗位',
          prop: 'jobName'
        },
        {
          label: '面试者',
          prop: 'intervieweeName'
        },
        {
          label: '面试时间',
          prop: 'interviewAt',
          formatter() {
            return row => {
              return moment(row.interviewAt)
                .utcOffset(0)
                .format('YYYY-MM-DD HH:mm')
            }
          }
        },
        {
          label: '面试地点',
          prop: 'address'
        },
        {
          label: '备注',
          prop: 'tip'
        },
        {
          label: '创建时间',
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
          key: 'companyName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索公司名称'
          }
        },
        {
          key: 'jobName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索职位名称'
          }
        },
        {
          key: 'intervieweeName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索面试者'
          }
        }
      ]
    }
  },

  methods: {
    async getInterviews(params = {}) {
      const res = await this.$axios.get('/interviews', {
        params: params
      })
      const list = res.data.interviews[0].Application && res.data.interviews
      if (list && list.length) {
        list.forEach(item => {
          const application = item.Application
          const interviewee = application && application.User
          const job = application && application.Job
          const company = job.Company
          item.intervieweeName = interviewee.realName
          item.companyName = company.name
          item.jobName = job.name
        })
      }

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
