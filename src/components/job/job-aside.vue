<template>
  <aside-wrapper
    class="aside-container"
    title="已申请的职位"
    link="/account/application"
  >
    <el-row
      slot="aside-content"
      class="flex-wrap content-list"
      type="flex"
      :gutter="20"
    >
      <el-col
        class="content-list-item"
        v-for="(job, index) in appliedJobs"
        :key="index"
      >
        <job-card is-simple-type :job="job" />
      </el-col>
    </el-row>
  </aside-wrapper>
</template>

<script>
import AsideWrapper from '@/components/aside/aside-wrapper'
import JobCard from '@/components/job/job-card'

export default {
  components: {
    AsideWrapper,
    JobCard
  },

  props: {
    appliedJobs: {
      type: Array,
      default: () => []
    }
  }
}
</script>
