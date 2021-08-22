<template>
  <div class="block-section">
    <div class="block-header">
      <h3>最新职位</h3>
      <el-link type="success">查看全部</el-link>
    </div>
    <job-list />
  </div>
</template>

<script>
import JobList from '@/components/job/job-list'

export default {
  components: {
    JobList
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
