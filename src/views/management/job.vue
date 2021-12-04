<template>
  <div class="management-job">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :extra-actions="actions"
      :fetch-data="getJobs"
      @add="handleAdd"
      @edit="handleEdit"
    />
    <job-edit-dialog ref="editDialogRef" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import {
  getMatchedLabel,
  colorTypeOptions,
  jobStatusOptions,
  jobTypeOptions,
  educationBackgroundOptions,
  workExperienceOptions
} from '@/utils/data-source'
import JobEditDialog from '@/components/job/job-edit-dialog'
import moment from 'moment'

export default {
  components: {
    BaseTable,
    JobEditDialog
  },
  data() {
    const vm = this
    return {
      isEdit: false,
      columns: [
        {
          width: '160px',
          label: '职位名称',
          prop: 'name'
        },
        {
          width: '120px',
          label: '职位类型',
          prop: 'type',
          formatter: optionFormatter(jobTypeOptions, 'type')
        },
        {
          width: '90px',
          label: '招聘人数',
          prop: 'recruitingNnumbers',
          formatter() {
            return row => {
              return row.recruitingNnumbers + '人'
            }
          }
        },
        {
          width: '100px',
          label: '已申请人数',
          prop: 'Applications',
          formatter() {
            return row => {
              return row.Applications.length + '人'
            }
          }
        },
        {
          width: '110px',
          label: '薪资范围',
          prop: 'salary'
        },
        {
          width: '100px',
          label: '学历要求',
          prop: 'educationBackground'
        },
        {
          width: '100px',
          label: '工作经验',
          prop: 'workExperience'
        },
        {
          label: '创建时间',
          prop: 'createdAt',
          formatter() {
            return row => {
              return moment(row.createdAt).format('YYYY-MM-DD HH:mm')
            }
          }
        },
        {
          width: '90px',
          label: '发布状态',
          prop: 'status',
          component: {
            control: 'BaseTag',
            attrs: {
              type({ row }) {
                return getMatchedLabel(colorTypeOptions, row.status)
              },
              text({ row }) {
                return getMatchedLabel(jobStatusOptions, row.status)
              }
            }
          }
        }
      ],
      actions: [
        {
          label({ row }) {
            return row.status ? '下架' : '发布'
          },
          type: 'success',
          events: {
            click({ row }) {
              const handleText = row.status ? '下架' : '发布'
              this.$confirm(`确认${handleText}该职位？`, {
                type: 'warning'
              }).then(async () => {
                await this.$axios.put(`/jobs/${row.id}`, {
                  status: !row.status
                })
                vm.$message.success(`${handleText}成功`)
                this.reload()
              })
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
          options: educationBackgroundOptions
        },
        {
          key: 'workExperience',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '工作经验'
          },
          options: workExperienceOptions
        },
        {
          key: 'name',
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
    async getJobs(params = {}) {
      const res = await this.$axios.get('/jobs', {
        params: params
      })
      const list = res.data.jobs
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
