<template>
  <app-layout class="job-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            职位列表
          </h2>
          <job-search class="job-search" />
          <el-row class="flex-wrap" type="flex" :gutter="15">
            <el-col
              class="mb-2"
              :span="12"
              v-for="(job, index) in jobs"
              :key="index"
            >
              <job-card :job="job" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col class="aside-wrapper" :span="7">
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
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
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
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg'
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
    .aside-wrapper {
      position: sticky;
      top: 0;
    }
  }
}
</style>
