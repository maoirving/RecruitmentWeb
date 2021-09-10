<template>
  <div class="application-wrapper">
    <el-tabs type="card">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label">
        <el-row class="flex-wrap content-list" type="flex" :gutter="20">
          <el-col
            class="content-list-item"
            :span="12"
            v-for="(job, index) in appliedJobs"
            :key="index"
          >
            <job-card is-simple-type :job="job" />
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
      appliedJobs: []
    }
  },

  methods: {
    getAppliedJobs() {
      const job = {
        name: '高级前端开发工程师',
        salary: '12-20k',
        city: '厦门',
        experience: '经验不限',
        education: '本科',

        company: {
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/logo/20210525/77d60eae41e48b90df64951371a7a07a19f97e2c258c6cead07beaf11928d91b.png?x-oss-process=image/resize,w_120,limit_0'
        }
      }
      for (let i = 0; i < 4; i++) {
        this.appliedJobs.push(job)
      }
    }
  },

  created() {
    this.getAppliedJobs()
  }
}
</script>

<style></style>
