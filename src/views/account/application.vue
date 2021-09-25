<template>
  <div class="application-wrapper">
    <el-tabs type="card">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label">
        <el-row class="flex-wrap content-list" type="flex" :gutter="20">
          <el-col
            class="content-list-item"
            :span="12"
            v-for="(application, index) in applications"
            :key="index"
          >
            <job-card :job="application.Job" :application="application" is-simple-type />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import JobCard from '@/components/job/job-card'

export default {
  components: {
    JobCard
  },

  data() {
    return {
      tabs: [
        {
          label: '全部'
        },
        {
          label: '被查看'
        },
        {
          label: '合适'
        },
        {
          label: '不合适'
        }
      ],
      applications: []
    }
  },

  methods: {
    async getApplications() {
      const res = await this.$axios.get('/applications')
      this.applications = res.data.applications
    }
  },

  created() {
    this.getApplications()
  }
}
</script>

<style lang="scss" scoped>
.application-wrapper {
  ::v-deep .el-tabs__content {
    padding-top: 5px;
  }
}
</style>
