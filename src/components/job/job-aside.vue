<template>
  <aside-wrapper class="aside-container" title="已申请的职位" :link="link">
    <template slot="aside-content">
      <el-row v-if="isAuthenticated" class="flex-wrap content-list" type="flex" :gutter="20">
        <el-col class="content-list-item" v-for="(application, index) in applications" :key="index">
          <job-card :job="application.Job" is-simple-type />
        </el-col>
      </el-row>
      <el-empty v-else description="请先登录" />
    </template>
  </aside-wrapper>
</template>

<script>
import AsideWrapper from '@/components/aside/aside-wrapper'
import JobCard from '@/components/job/job-card'
import { mapGetters } from 'vuex'

export default {
  components: {
    AsideWrapper,
    JobCard
  },

  data() {
    return {
      applications: []
    }
  },

  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    link() {
      return this.isAuthenticated ? '/account/application' : undefined
    }
  },

  methods: {
    async getApplications() {
      const res = await this.$axios.get('/applications', {
        params: {
          limit: 4
        }
      })
      this.applications = res.data.applications
    }
  },

  mounted() {
    if (this.isAuthenticated) {
      this.getApplications()
    }
  }
}
</script>
