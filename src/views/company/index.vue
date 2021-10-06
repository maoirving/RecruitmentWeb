<template>
  <app-layout class="company-list-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card class="main-content">
          <h2 class="text-2xl main-title">
            公司列表
          </h2>
          <company-search class="mb-3" @filter="handleFilter" />
          <div class="result-wrapper" v-loading="isLoading">
            <el-row v-if="companies && companies.length" class="flex-wrap" type="flex" :gutter="15">
              <el-col class="mb-3" :span="8" v-for="(company, index) in companies" :key="index">
                <company-card :company="company" />
              </el-col>
            </el-row>
            <el-empty v-if="companies !== null && !companies.length" description="未找到相关公司" />
          </div>

          <base-pagination :pageInfo="pageInfo" @pagination="getCompanies" />
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
import companySearch from '@/components/company/company-search'
import CompanyCard from '@/components/company/company-card'
import CompanyAside from '@/components/company/company-aside'
import BasePagination from '@/components/base/base-pagination'
import { omitBy } from 'lodash'

export default {
  components: {
    AppLayout,
    companySearch,
    CompanyCard,
    BasePagination,
    CompanyAside
  },

  data() {
    return {
      companies: null,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      filterParams: {},
      isLoading: true
    }
  },

  methods: {
    async getCompanies() {
      this.isLoading = true
      const res = await this.$axios.get('/companies', {
        params: {
          currentPage: this.pageInfo.currentPage,
          limit: this.pageInfo.pageSize,
          ...this.filterParams
        }
      })
      setTimeout(() => {
        this.pageInfo.total = res.data.pagination.total
        this.companies = res.data.companies
        this.isLoading = false
      }, 600)
    },

    handleFilter(params) {
      this.pageInfo.currentPage = 1
      this.filterParams = omitBy(params, val => val === '')
      console.log(this.filterParams)
      this.getCompanies()
    }
  },

  mounted() {
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
      .result-wrapper {
        min-height: 400px;
      }
    }
    .aside-wrapper {
      position: sticky;
      top: 0;
    }
  }
}
</style>
