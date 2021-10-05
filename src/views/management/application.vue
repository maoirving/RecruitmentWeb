<template>
  <div class="management-application">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :extra-actions="actions"
      :fetch-data="getApplications"
      @add="handleAdd"
      @edit="handleEdit"
    />
    <application-edit-dialog ref="editDialogRef" />
    <application-handle-dialog ref="applicationHandleDialogRef" />
    <pdf-dialog ref="resumeReadRef" @close-dialog="handleRead" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import {
  jobTypeOptions,
  educationBackgroundOptions,
  handledStatusOptions
} from '@/utils/data-source'
import moment from 'moment'
import ApplicationHandleDialog from '@/components/application/application-handle-dialog'
import PdfDialog from '@/components/account/resume/pdf-dialog'
import ApplicationEditDialog from '@/components/application/application-edit-dialog'

export default {
  components: {
    BaseTable,
    ApplicationHandleDialog,
    PdfDialog,
    ApplicationEditDialog
  },
  data() {
    const vm = this
    return {
      dialogVisible: false,
      columns: [
        {
          label: '职位名称',
          prop: 'jobName'
        },
        {
          width: '90px',
          label: '职位类型',
          prop: 'jobType',
          formatter: optionFormatter(jobTypeOptions, 'jobType')
        },
        {
          width: '90px',
          label: '姓名',
          prop: 'userRealName'
        },
        {
          width: '80px',
          label: '性别',
          prop: 'userSex'
        },
        {
          width: '90px',
          label: '年龄',
          prop: 'userAge'
        },
        {
          label: '简历',
          prop: 'resumeName'
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
        },
        {
          width: '90px',
          label: '处理状态',
          prop: 'handledStatus',
          component: {
            control: 'BaseTag',
            attrs: {
              type({ row }) {
                return row.handledStatus === 1
                  ? 'success'
                  : row.handledStatus === 0
                  ? 'warning'
                  : 'danger'
              },
              text({ row }) {
                return row.handledStatus === 1
                  ? '通过初筛'
                  : row.handledStatus === 0
                  ? '未处理'
                  : '不合适'
              }
            }
          }
        }
      ],
      actions: [
        {
          label: '查看简历',
          events: {
            click({ row }) {
              vm.$refs.resumeReadRef.applicationId = row.id
              vm.$refs.resumeReadRef.url = 'http://localhost:3000/uploads/resumes/业务引导卡.pdf'
              vm.$refs.resumeReadRef.dialogVisible = true
            }
          }
        },
        {
          label: '处理',
          type: 'warning',
          events: {
            click({ row }) {
              console.log(row)
              vm.$refs.applicationHandleDialogRef.outerRow = row
              vm.$refs.applicationHandleDialogRef.tableThis = this
              vm.$refs.applicationHandleDialogRef.dialogVisible = true
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
          key: 'jobType',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '职位类型'
          },
          options: jobTypeOptions
        },
        {
          key: 'educationBackground',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '学历要求'
          },
          options: educationBackgroundOptions.filter(item => item.value !== '不限')
        },
        {
          key: 'handledStatus',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '处理状态'
          },
          options: handledStatusOptions
        },
        {
          key: 'userRealName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索求职者姓名'
          }
        },
        {
          key: 'jobName',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索职位名称'
          }
        }
      ]
    }
  },

  methods: {
    async getApplications(params = {}) {
      const res = await this.$axios.get('/applications', {
        params: params
      })
      const list = res.data.applications
      list.forEach(item => {
        const user = item.User
        const job = item.Job
        const resume = item.ResumeFile
        item.userRealName = user.realName
        item.userSex = user.sex
        item.userAge = new Date().getFullYear() - new Date(user.birthday).getFullYear() + '岁'
        item.jobName = job.name
        item.jobType = job.type
        item.resumeName = resume && resume.name
        item.companyId = job.companyId
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
    },
    async handleRead(applicationId) {
      const res = await this.$axios.put(`/applications/${applicationId}`, {
        readAt: new Date()
      })
      this.resumeDialogVisible = false
    }
  }
}
</script>
