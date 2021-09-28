<template>
  <div class="job-search">
    <base-search
      input-placeholder="请输入职位名称"
      :filterData="searchForm"
      :filterItems="filters"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import BaseSearch from '@/components/base/base-search.vue'
import {
  jobTypeOptions,
  educationBackgroundOptions,
  workExperienceOptions,
  financingStageOptions,
  scaleOptions
} from '@/utils/data-source'

export default {
  components: {
    BaseSearch
  },

  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        educationBackground: '',
        workExperience: '',
        financingStage: '',
        scale: ''
      },
      filters: [
        {
          name: '招聘类型',
          prop: 'type',
          options: jobTypeOptions
        },
        {
          name: '学历要求',
          prop: 'educationBackground',
          options: educationBackgroundOptions
        },
        {
          name: '工作经验',
          prop: 'workExperience',
          options: workExperienceOptions
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
