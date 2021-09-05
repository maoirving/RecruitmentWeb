<template>
  <app-layout class="job-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            职位列表
          </h2>
          <job-search class="job-search" />
          <el-row
            v-if="jobs && jobs.length"
            class="flex-wrap"
            type="flex"
            :gutter="15"
          >
            <el-col
              class="mb-3"
              :span="12"
              v-for="(job, index) in jobs"
              :key="index"
            >
              <job-card :job="job" />
            </el-col>
          </el-row>
          <el-empty v-else description="暂无职位" />
        </el-card>
      </el-col>
      <el-col class="aside-box" :span="7">
        <job-aside :applied-jobs="appliedJobs" />
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/search/job-search'
import JobCard from '@/components/job/job-card'
import JobAside from '@/components/job/job-aside'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobCard,
    JobAside
  },
  data() {
    return {
      jobs: [],
      appliedJobs: []
    }
  },
  methods: {
    async init() {
      await this.getJobs()
      this.getAppliedJobs()
    },

    getJobs() {
      const job = {
        name: '高级前端开发工程师',
        salary: '12-20k',
        city: '厦门',
        experience: '经验不限',
        education: '本科',
        company: {
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/logo/20210525/77d60eae41e48b90df64951371a7a07a19f97e2c258c6cead07beaf11928d91b.png?x-oss-process=image/resize,w_120,limit_0',
          category: '计算机',
          financingStage: '已上市'
        }
      }
      for (let i = 0; i < 20; i++) {
        this.jobs.push(job)
      }
    },

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
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.job-list-page {
  position: relative;
  .content-wrapper {
    .main-content {
      .main-title {
        margin-bottom: $gap;
      }
      .job-search {
        margin-bottom: $gap;
      }
    }
    .aside-box {
      position: sticky;
      top: 0;
    }
  }
}
</style>
