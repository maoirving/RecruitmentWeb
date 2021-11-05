<template>
  <div class="interview-wrapper">
    <el-tabs v-model="currentTab" type="card" @tab-click="getInterviews">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.name">
        <div class="result-wrapper" v-loading="loading">
          <el-row v-if="interviews && interviews.length" class="flex-wrap" type="flex" :gutter="10">
            <el-col v-for="(interview, i) in interviews" :key="i">
              <interview-card :interview="interview" @click-card="showDialog" />
            </el-col>
          </el-row>
          <el-empty
            v-if="interviews !== null && !interviews.length"
            description="未找到相应的面试邀请"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <interview-edit-dialog ref="editDialogRef" is-in-worker />
  </div>
</template>

<script>
import InterviewCard from '@/components/interview/interview-card'
import InterviewEditDialog from '@/components/interview/interview-edit-dialog'

export default {
  components: {
    InterviewCard,
    InterviewEditDialog
  },

  data() {
    return {
      currentTab: 'all',
      tabs: [
        {
          label: '面试邀请',
          name: 'all'
        },
        {
          label: '未处理',
          name: 'notHandled'
        },
        {
          label: '已接受',
          name: 'agreed'
        },
        {
          label: '已拒绝',
          name: 'refused'
        }
      ],
      interviews: null,
      loading: true
    }
  },

  methods: {
    async getInterviews() {
      this.loading = true
      let params = {}
      switch (this.currentTab) {
        case 'notHandled':
          params.agreedStatus = 0
          break
        case 'agreed':
          params.agreedStatus = 1
          break
        case 'refused':
          params.agreedStatus = -1
          break
        default:
          break
      }
      const res = await this.$axios.get('/interviews', {
        params: {
          ...params
        }
      })
      const list = res.data.interviews
      if (list && list.length) {
        list.forEach(item => {
          const recruiter = item.Recruiter
          const application = item.Application
          const interviewee = application && application.User
          const job = application && application.Job
          const company = job.Company
          item.intervieweeName = interviewee.realName
          item.companyName = company.name
          item.companyImageUrl = company.imageUrl
          item.jobName = job.name
          item.recruiterName = recruiter.realName
          item.recruiterImageUrl = recruiter.imageUrl
        })
      }
      setTimeout(() => {
        this.interviews = list
        this.loading = false
      }, 400)
    },
    reload() {
      this.getInterviews()
    },
    showDialog(interview) {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.outerThis = this
      this.$refs.editDialogRef.outerData = interview
    }
  },

  mounted() {
    this.getInterviews()
  }
}
</script>

<style lang="scss" scoped>
.interview-wrapper {
  .result-wrapper {
    min-height: 400px;
  }
}
</style>
