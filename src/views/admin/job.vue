<template>
  <div class="admin-job">
    <base-table
      :buttons="buttons"
      :filter-items="filters"
      :columns="columns"
      :data="jobs"
      :actions="actions"
    />
  </div>
</template>

<script>
import BaseTable from '@/components/base/base-table'

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: [
        {
          label: '职位名称',
          prop: 'name'
        },
        {
          label: '职位类型',
          prop: 'type'
        },
        {
          label: '薪资范围',
          prop: 'salary'
        },
        {
          label: '工作城市',
          prop: 'city'
        },
        {
          label: '工作经验',
          prop: 'experience'
        },
        {
          label: '学历要求',
          prop: 'education'
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
      ],
      jobs: []
    }
  },

  computed: {
    filters() {
      return [
        {
          key: 'type',
          span: 4,
          component: {
            control: 'el-select',
            attrs: {
              clearable: true,
              placeholder: '职位类型'
            }
          }
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
    getJobs(criteria) {
      const job = {
        name: 'web前端开发工程师',
        type: '校园招聘',
        salary: '7-12K',
        city: '厦门',
        experience: '经验不限',
        education: '本科'
      }
      this.jobs = Array(10).fill(job)
      const result = {
        data: { list: this.jobs }
      }
      return result
    }
  },

  created() {
    this.getJobs()
  }
}
</script>

<style></style>
