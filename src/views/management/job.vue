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
    <job-edit-dialog
      ref="jobEditRef"
      :visible.sync="dialogVisible"
      @close-dialog="dialogVisible = false"
    />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import {
  jobTypeOptions,
  educationBackgroundOptions,
  workExperienceOptions
} from '@/utils/data-source'
import JobEditDialog from '@/components/job/job-edit-dialog'
import moment from 'moment'
import { pick } from 'lodash'
import { parseToText } from '@/utils/html-text'

export default {
  components: {
    BaseTable,
    JobEditDialog
  },
  data() {
    const vm = this
    return {
      dialogVisible: false,
      columns: [
        {
          label: '职位名称',
          prop: 'name'
        },
        {
          label: '职位类型',
          prop: 'type',
          formatter: optionFormatter(jobTypeOptions, 'type')
        },
        {
          label: '薪资范围',
          prop: 'salary'
        },
        {
          label: '工作经验',
          prop: 'workExperience'
        },
        {
          label: '学历要求',
          prop: 'educationBackground'
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
          label({ row }) {
            return row.status ? '下架' : '发布'
          },
          type: 'success',
          events: {
            click({ row }) {
              const handleText = row.status ? '下架' : '发布'
              this.$confirm(`确认${handleText}该职位？`, { type: 'warning' }).then(async () => {
                await this.$axios.put(`/jobs/${row.id}`, {
                  status: !row.status
                })
                vm.$message.success(`${handleText}成功`)
                this.reload()
              })
            }
          }
        }
      ],
      buttons: [
        {
          label: '新增职位',
          key: 'addCoupon',
          span: 12,
          events: {
            click(item) {
              self.$router.push({ name: 'add-discount-coupon' })
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
      this.$refs.jobEditRef.tableThis = vm
      this.dialogVisible = true
    },
    handleEdit(row, vm, isEdit) {
      this.dialogVisible = true
      this.$refs.jobEditRef.tableThis = vm
      this.$refs.jobEditRef.jobId = row.id
      this.$refs.jobEditRef.isEdit = isEdit
      this.$refs.jobEditRef.jobForm = pick(row, [
        'name',
        'type',
        'recruitingNnumbers',
        'workLocation',
        'workExperience',
        'educationBackground',
        'description',
        'skill',
        'companyId',
        'status'
      ])
      this.$refs.jobEditRef.jobForm.description = parseToText(row.description)
      this.$refs.jobEditRef.jobForm.skill = parseToText(row.skill)
      let salaryArr = row.salary.substr(0, row.salary.length - 1).split('-')
      this.$refs.jobEditRef.jobForm.minSalary = parseInt(salaryArr[0])
      this.$refs.jobEditRef.jobForm.maxSalary = parseInt(salaryArr[1])
    }
  }
}
</script>

<style></style>
