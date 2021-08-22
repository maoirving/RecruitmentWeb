<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <job-card />
    </el-col>
    <el-col :span="8">
      <job-card />
    </el-col>
    <el-col :span="8">
      <job-card />
    </el-col>
  </el-row>
</template>

<script>
import JobCard from '@/components/job/job-card'

export default {
  components: {
    JobCard
  }
}
</script>

<style></style>
