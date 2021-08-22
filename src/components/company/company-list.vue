<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <company-tile />
    </el-col>
    <el-col :span="6">
      <company-tile />
    </el-col>
    <el-col :span="6">
      <company-tile />
    </el-col>
    <el-col :span="6">
      <company-tile />
    </el-col>
  </el-row>
</template>

<script>
import CompanyTile from '@/components/company/company-tile'

export default {
  components: {
    CompanyTile
  }
}
</script>

<style></style>
