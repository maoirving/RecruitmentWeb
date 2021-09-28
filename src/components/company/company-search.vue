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
import { companyTypeOptions, financingStageOptions, scaleOptions } from '@/utils/data-source'

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
          options: companyTypeOptions
        },
        {
          name: '融资阶段',
          prop: 'financingStage',
          options: financingStageOptions
        },
        {
          name: '公司规模',
          prop: 'scale',
          options: scaleOptions
        }
      ]
    }
  }
}
</script>
