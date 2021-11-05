<template>
  <app-layout class="job-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            职位列表
          </h2>
          <job-search class="mb-3" @filter="handleFilter" />
          <div class="result-wrapper" v-loading="isLoading">
            <el-row v-if="jobs && jobs.length" class="flex-wrap" type="flex" :gutter="15">
              <el-col class="mb-3" :span="12" v-for="(job, index) in jobs" :key="index">
                <job-card :job="job" />
              </el-col>
            </el-row>
            <el-empty v-if="jobs !== null && !jobs.length" description="未找到相关职位" />
          </div>

          <base-pagination :pageInfo="pageInfo" @pagination="getJobs" />
        </el-card>
      </el-col>
      <el-col class="aside-box" :span="7">
        <job-aside />
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/job/job-search'
import JobCard from '@/components/job/job-card'
import BasePagination from '@/components/base/base-pagination'
import JobAside from '@/components/job/job-aside'
import { omitBy } from 'lodash'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobCard,
    BasePagination,
    JobAside
  },
  data() {
    return {
      jobs: null,
      pageInfo: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      filterParams: {},
      isLoading: true
    }
  },
  methods: {
    async getJobs() {
      this.isLoading = true
      const res = await this.$axios.get('/jobs', {
        params: {
          active: true,
          currentPage: this.pageInfo.currentPage,
          limit: this.pageInfo.pageSize,
          ...this.filterParams
        }
      })
      setTimeout(() => {
        this.pageInfo.total = res.data.pagination.total
        this.jobs = res.data.jobs
        this.isLoading = false
      }, 600)
    },

    handleFilter(params) {
      this.pageInfo.currentPage = 1
      this.filterParams = omitBy(params, val => val === '')
      console.log(this.filterParams)
      this.getJobs()
    }
  },

  created() {
    this.getJobs()
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
      .result-wrapper {
        min-height: 400px;
      }
    }
    .aside-box {
      position: sticky;
      top: 0;
    }
  }
}
</style>
