<template>
  <div class="management-company">
    <base-table
      :columns="columns"
      :fetch-data="getCompanies"
      :actions="actions"
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
