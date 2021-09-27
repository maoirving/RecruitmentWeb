<template>
  <div class="job-search">
    <base-search
      input-placeholder="请输入公司名称"
      :filterData="searchForm"
      :filterItems="filters"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import BaseSearch from '@/components/base/base-search.vue'

export default {
  components: {
    BaseSearch
  },

  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        financingStage: '',
        scale: ''
      },
      filters: [
        {
          name: '行业类别',
          prop: 'type',
          options: [
            {
              label: '电子商务',
              value: '电子商务'
            },
            {
              label: '游戏',
              value: '游戏'
            },
            {
              label: '媒体',
              value: '媒体'
            },
            {
              label: '互联网',
              value: '互联网'
            },
            {
              label: '计算机软件',
              value: '计算机软件'
            },
            {
              label: '其他',
              value: '其他'
            }
          ]
        },
        {
          name: '融资阶段',
          prop: 'financingStage',
          options: [
            {
              label: '未融资',
              value: '未融资'
            },
            {
              label: '天使轮',
              value: '天使轮'
            },
            {
              label: 'A轮',
              value: 'A轮'
            },
            {
              label: 'B轮',
              value: 'B轮'
            },
            {
              label: 'C轮',
              value: 'C轮'
            },
            {
              label: 'D轮及以上',
              value: 'D轮及以上'
            },
            {
              label: '已上市',
              value: '已上市'
            },
            {
              label: '不需要融资',
              value: '不需要融资'
            }
          ]
        },
        {
          name: '公司规模',
          prop: 'scale',
          options: [
            {
              label: '0-20人',
              value: '0-20人'
            },
            {
              label: '20-99人',
              value: '20-99人'
            },
            {
              label: '100-499人',
              value: '100-499人'
            },
            {
              label: '500-999人',
              value: '500-999人'
            },
            {
              label: '1000-9999人',
              value: '1000-9999人'
            },
            {
              label: '10000人以上',
              value: '10000人以上'
            }
          ]
        }
      ]
    }
  }
}
</script>
