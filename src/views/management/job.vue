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
import moment from 'moment'

export default {
  components: {
    BaseTable
  },
  data() {
    const vm = this
    return {
      columns: [
        {
          type: 'selection',
          label: ''
        },
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
            click(scope) {
              console.log('编辑')
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
          span: 4,
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
