<template>
  <div class="management-job">
    <base-table
      :filter-items="filters"
      :columns="columns"
      :extra-actions="actions"
      :fetch-data="getApplications"
      :default-actions="['delete']"
      @add="handleAdd"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import {
  jobTypeOptions,
  educationBackgroundOptions,
  workExperienceOptions,
  statusOptions
} from '@/utils/data-source'
import moment from 'moment'

export default {
  components: {
    BaseTable
  },
  data() {
    const vm = this
    return {
      statusClass: '',
      columns: [
        {
          label: '职位名称',
          prop: 'jobName'
        },
        {
          label: '职位类型',
          prop: 'jobType',
          formatter: optionFormatter(jobTypeOptions, 'jobType')
        },
        {
          label: '姓名',
          prop: 'userRealName'
        },
        {
          label: '性别',
          prop: 'userSex'
        },
        {
          label: '年龄',
          prop: 'userAge'
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
            click(scope) {
              console.log('编辑')
            }
          }
        },
        {
          label: '处理',
          type: 'warning',
          events: {
            click(scope) {
              this.$confirm(`处理求职申请`, { type: 'warning' })
                .then(async () => {
                  const res = await this.$axios.delete(`/${this.routeKey}/${row.id}`)
                  if (!res.data.success) {
                    return this.$message.error('删除失败')
                  }
                  this.$message.success('删除成功')
                  this.reload()
                })
                .catch(() => {})
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
          key: 'handledStatus',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '处理状态'
          },
          options: statusOptions
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
        item.userRealName = user.realName
        item.userSex = user.sex
        item.userAge = new Date().getFullYear() - new Date(user.birthday).getFullYear() + '岁'
        item.jobName = job.name
        item.jobType = job.type
      })
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
