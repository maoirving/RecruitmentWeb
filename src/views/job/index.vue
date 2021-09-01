<template>
  <app-layout>
    <el-row class="menu-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card>
          <h2 class="primary-title">
            职位列表
          </h2>
          <job-search class="mb-2" />
          <el-row class="flex-wrap" type="flex" :gutter="15">
            <el-col class="mb-2" :span="12" v-for="(job, index) in jobs" :key="index">
              <job-card :job="job" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <job-aside />
        </el-card>
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/search/job-search'
import JobList from '@/components/job/job-list'
import JobCard from '@/components/job/job-card'
import JobAside from '@/components/job/job-aside'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobList,
    JobCard,
    JobAside
  },
  data() {
    return {
      jobs: [
        {
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
      ]
    }
  },
  methods: {
    getJobs() {
      for (let i = 0; i < 20; i++) {
        this.jobs.push(this.jobs[0])
      }
    }
  },
  created() {
    this.getJobs()
  }
}
</script>

<style></style>
