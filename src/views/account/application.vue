<template>
  <div class="application-wrapper">
    <el-tabs v-model="currentTab" type="card" @tab-click="getApplications">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.name">
        <div class="result-wrapper" v-loading="loading">
          <el-row
            v-if="applications && applications.length"
            class="flex-wrap content-list"
            type="flex"
            :gutter="20"
          >
            <el-col
              class="content-list-item"
              :span="12"
              v-for="(application, index) in applications"
              :key="index"
            >
              <job-card
                :job="application.Job"
                :application="application"
                is-simple-type
                @delete-application="handleDelete"
              />
            </el-col>
          </el-row>
          <el-empty
            v-if="applications !== null && !applications.length"
            description="未找到相应的申请"
          />
        </div>
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
      currentTab: 'all',
      tabs: [
        {
          label: '全部',
          name: 'all'
        },
        {
          label: '被查看',
          name: 'isRead'
        },
        {
          label: '通过初筛',
          name: 'pass'
        },
        {
          label: '不合适',
          name: 'notPass'
        }
      ],
      applications: null,
      loading: true
    }
  },

  methods: {
    async getApplications() {
      this.loading = true

      let params = {}
      switch (this.currentTab) {
        case 'isRead':
          params.isRead = 1
          break
        case 'pass':
          params.handledStatus = 1
          break
        case 'notPass':
          params.handledStatus = -1
          break
        default:
          break
      }
      const res = await this.$axios.get('/applications', {
        params: {
          ...params
        }
      })
      setTimeout(() => {
        this.applications = res.data.applications
        this.loading = false
      }, 400)
    },

    handleDelete(id) {
      this.$confirm('确认撤销该申请？', { type: 'warning' })
        .then(async () => {
          const res = await this.$axios.delete(`/applications/${id}`)
          if (!(res.data && res.data.success)) {
            return this.$message.console.error('撤销失败！')
          }
          await this.getApplications()
          this.$message.success('撤销成功！')
        })
        .catch(() => {})
    }
  },

  mounted() {
    this.getApplications()
  }
}
</script>

<style lang="scss" scoped>
.application-wrapper {
  ::v-deep .el-tabs__content {
    padding-top: 5px;
  }
  .result-wrapper {
    min-height: 400px;
  }
}
</style>
