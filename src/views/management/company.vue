<template>
  <div class="management-company">
    <base-table
      :columns="columns"
      :filter-items="filters"
      :fetch-data="getCompanies"
      :actions="actions"
      @add="handleAdd"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import { companyTypeOptions, financingStageOptions, scaleOptions } from '@/utils/data-source'
import moment from 'moment'

export default {
  components: {
    BaseTable
  },

  data() {
    return {
      columns: [
        {
          label: '公司名称',
          prop: 'name'
        },
        {
          label: '行业类别',
          prop: 'type'
        },
        {
          label: '融资阶段',
          prop: 'financingStage'
        },
        {
          label: '公司地址',
          prop: 'address'
        },
        {
          label: '法定代表人',
          prop: 'legalRepresentative'
        },
        {
          label: '注册资本',
          prop: 'registeredCapital'
        },
        {
          label: '成立日期',
          prop: 'registeredAt',
          formatter() {
            return row => {
              return moment(row.createdAt)
                .utcOffset(0)
                .format('YYYY-MM-DD')
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
            placeholder: '行业类别'
          },
          options: companyTypeOptions
        },
        {
          key: 'financingStage',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '融资阶段'
          },
          options: financingStageOptions
        },
        {
          key: 'scale',
          span: 4,
          isSelect: true,
          attrs: {
            clearable: true,
            placeholder: '公司规模'
          },
          options: scaleOptions
        },
        {
          key: 'name',
          span: 5,
          attrs: {
            clearable: true,
            placeholder: '搜索公司名称'
          }
        }
      ]
    }
  },

  methods: {
    async getCompanies(params) {
      const res = await this.$axios.get('/companies', {
        params: params
      })
      const list = res.data.companies
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
