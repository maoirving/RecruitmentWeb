<template>
  <app-layout class="company-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            公司列表
          </h2>
          <company-search class="company-search" />
          <el-row class="flex-wrap" type="flex" :gutter="15">
            <el-col class="mb-3" :span="8" v-for="(company, index) in companys" :key="index">
              <company-card :company="company" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col class="aside-wrapper" :span="7">
        <company-aside :jobs="jobs" />
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import companySearch from '@/components/search/company-search'
import CompanyCard from '@/components/company/company-card'
import CompanyAside from '@/components/company/company-aside'

export default {
  components: {
    AppLayout,
    companySearch,
    CompanyCard,
    CompanyAside
  },
  data() {
    return {
      companys: [],
      jobs: []
    }
  },

  methods: {
    async init() {
      await this.getCompanys()
      this.getNewJobs()
    },

    getCompanys() {
      const company = {
        id: 1,
        name: '字节跳动科技有限公司',
        jobNumber: '11',
        imageUrl:
          'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
        category: '游戏',
        financingStage: '已上市',
        staffCount: '1000人以上'
      }
      for (let i = 0; i < 20; i++) {
        this.companys.push(company)
      }
    },

    getNewJobs() {
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
        this.jobs.push(job)
      }
    }
  },

  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.company-list-page {
  position: relative;
  .content-wrapper {
    .main-content {
      .main-title {
        margin-bottom: $gap;
      }
      .company-search {
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
