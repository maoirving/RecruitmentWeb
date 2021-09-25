<template>
  <block-section title="热门企业" url="/company">
    <template slot="block-content">
      <el-row class="flex-wrap" type="flex" :gutter="20">
        <el-col class="mb-3" :span="6" v-for="(company, index) in companies" :key="index">
          <company-card :company="company" />
        </el-col>
      </el-row>
    </template>
  </block-section>
</template>

<script>
import BlockSection from '@/components/blocks/common/block-section'
import CompanyCard from '@/components/company/company-card'

export default {
  components: {
    BlockSection,
    CompanyCard
  },

  data() {
    return {
      companies: []
    }
  },

  methods: {
    async getCompanies() {
      const res = await this.$axios.get('/companies?limit=4')
      this.companies = res.data.companies
    }
  },

  created() {
    this.getCompanies()
  }
}
</script>
