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
    <company-edit-dialog ref="editDialogRef" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import { optionFormatter } from '@/utils/formatter'
import {
  companyTypeOptions,
  financingStageOptions,
  scaleOptions
} from '@/utils/data-source'
import moment from 'moment'
import CompanyEditDialog from '@/components/company/company-edit-dialog'

export default {
  components: {
    BaseTable,
    CompanyEditDialog
  },

  data() {
    return {
      columns: [
        {
          width: '120px',
          label: '公司名称',
          prop: 'name'
        },
        {
          width: '90px',
          label: '行业类别',
          prop: 'type'
        },
        {
          width: '90px',
          label: '融资阶段',
          prop: 'financingStage'
        },
        {
          width: '90px',
          label: '公司规模',
          prop: 'scale'
        },
        {
          label: '公司地址',
          prop: 'address'
        },
        {
          width: '90px',
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
              return moment(row.registeredAt).format('YYYY-MM-DD')
            }
          }
        },
        {
          label: '创建时间',
          prop: 'createdAt',
          formatter() {
            return row => {
              return moment(row.createdAt).format('YYYY-MM-DD HH:mm')
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

<style></style>
