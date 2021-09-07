<template>
  <div class="admin-company">
    <m-table :columns="columns" :data="companys" :actions="actions" />
  </div>
</template>

<script>
import MTable from '@/components/module/m-table'

export default {
  components: {
    MTable
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
          prop: 'establishmentDate'
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
      ],
      companys: []
    }
  },

  methods: {
    getCompanys() {
      const company = {
        name: '阿里巴巴科技有限公司',
        type: '互联网',
        financingStage: '已上市',
        address: '厦门思明区厦门市软件园望海路8号楼1楼',
        legalRepresentative: '张某人',
        registeredCapital: '10000万',
        establishmentDate: '2011-02-21'
      }
      this.companys = Array(10).fill(company)
    }
  },

  created() {
    this.getCompanys()
  }
}
</script>

<style></style>
