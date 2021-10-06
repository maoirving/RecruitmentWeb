<template>
  <div class="management-interview">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :fetch-data="getInterviews"
      @add="handleAdd"
      @edit="handleEdit"
    />
    <interview-edit-dialog ref="editDialogRef" with-application />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { getMatchedLabel, colorTypeOptions, agreedStatusOptions } from '@/utils/data-source'
import InterviewEditDialog from '@/components/interview/interview-edit-dialog'
import moment from 'moment'

export default {
  components: {
    BaseTable,
    InterviewEditDialog
  },
  data() {
    return {
      columns: [
        {
          label: '公司名称',
          prop: 'companyName'
        },
        {
          label: '面试岗位',
          prop: 'jobName'
        },
        {
          width: '90px',
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
          width: '90px',
          label: '处理状态',
          prop: 'agreedStatus',
          component: {
            control: 'BaseTag',
            attrs: {
              type({ row }) {
                return getMatchedLabel(colorTypeOptions, row.agreedStatus)
              },
              text({ row }) {
                return getMatchedLabel(agreedStatusOptions, row.agreedStatus)
              }
            }
          }
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
      ]
    }
  },

  computed: {
    filters() {
      return [
        {
          key: 'agreedStatus',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '处理状态'
          },
          options: agreedStatusOptions
        },
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
      const list = res.data.interviews
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
