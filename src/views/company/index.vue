<template>
  <app-layout class="company-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            公司列表
          </h2>
          <company-search class="company-search" />
          <el-row v-if="companies && companies.length" class="flex-wrap" type="flex" :gutter="15">
            <el-col class="mb-3" :span="8" v-for="(company, index) in companies" :key="index">
              <company-card :company="company" />
            </el-col>
          </el-row>
          <el-empty v-else description="暂无公司" />
        </el-card>
      </el-col>
      <el-col class="aside-wrapper" :span="7">
        <company-aside />
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
      companies: []
    }
  },

  methods: {
    async getCompanies() {
      const res = await this.$axios.get('/companies')
      this.companies = res.data.companies
    }
  },

  created() {
    this.getCompanies()
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
