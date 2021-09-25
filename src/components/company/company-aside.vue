<template>
  <aside-wrapper class="aside-container" title="最新职位" link="/job">
    <el-row slot="aside-content" class="flex-wrap content-list" type="flex" :gutter="20">
      <el-col class="content-list-item" v-for="(job, index) in jobs" :key="index">
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

  data() {
    return {
      jobs: []
    }
  },

  methods: {
    async getJobs() {
      const res = await this.$axios.get('/jobs?limit=4')
      this.jobs = res.data.jobs
    }
  },

  created() {
    this.getJobs()
  }
}
</script>
