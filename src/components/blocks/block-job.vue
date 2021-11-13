<template>
  <block-section title="最新职位" url="/job">
    <template slot="block-content">
      <el-row class="flex-wrap" type="flex" :gutter="20">
        <el-col
          class="mb-3"
          v-for="(job, index) in jobs"
          :key="index"
          :span="8"
        >
          <job-card :job="job" />
        </el-col>
      </el-row>
    </template>
  </block-section>
</template>

<script>
import BlockSection from '@/components/blocks/common/block-section'
import JobCard from '@/components/job/job-card'

export default {
  components: {
    BlockSection,
    JobCard
  },

  data() {
    return {
      jobs: []
    }
  },

  methods: {
    async getJobs() {
      const res = await this.$axios.get('/jobs', {
        params: {
          active: true,
          limit: 6
        }
      })
      this.jobs = res.data.jobs
    }
  },

  created() {
    this.getJobs()
  }
}
</script>

<style lang="scss" scoped>
.block-section {
}
</style>
