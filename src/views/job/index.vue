<template>
  <app-layout>
    <el-row class="menu-wrapper" :gutter="20">
      <el-col :span="16"> 这是职位页面 <job-list /></el-col>
      <el-col :span="6">信息</el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobList from '@/components/job/job-list'

export default {
  components: {
    AppLayout,
    JobList
  }
}
</script>

<style></style>
