<template>
  <div class="block-section">
    <div class="block-header">
      <h3>热门企业</h3>
      <el-link type="success">查看全部</el-link>
    </div>
    <company-list />
  </div>
</template>

<script>
import CompanyList from '@/components/company/company-list'

export default {
  components: {
    CompanyList
  }
}
</script>

<style lang="scss" scoped>
.block-section {
  .block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
}
</style>
