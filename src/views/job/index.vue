<template>
  <app-layout class="job-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            职位列表
          </h2>
          <job-search class="job-search" />
          <el-row v-if="jobs && jobs.length" class="flex-wrap" type="flex" :gutter="15">
            <el-col class="mb-3" :span="12" v-for="(job, index) in jobs" :key="index">
              <job-card :job="job" />
            </el-col>
          </el-row>
          <el-empty v-else description="暂无职位" />
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
      jobs: []
    }
  },
  methods: {
    async getJobs() {
      const res = await this.$axios.get('/jobs')
      this.jobs = res.data.jobs
    }
  },

  created() {
    this.getJobs()
    const arr = ['mao', 'hello', 'hi']
    const json = [
      {
        facets: [
          {
            name: 'hello'
          },
          {
            name: 'maoen'
          }
        ]
      },
      {
        facets: [
          {
            name: 'kjdk'
          },
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'hello'
          },
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'kjdk'
          },
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'hello'
          },
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: [
          {
            name: 'mao'
          }
        ]
      },
      {
        facets: []
      }
    ]
    json.some(item => {
      const result = item.facets.every(i => {
        const name = i.name
        const nameEn = name.substring(0, name.length - 2)
        console.log(nameEn)
        return arr.indexOf(name) !== -1 || arr.indexOf(nameEn) !== -1
      })
      if (result) {
        console.log(item)
      }
      return result
    })
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
