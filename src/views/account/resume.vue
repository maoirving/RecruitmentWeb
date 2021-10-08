<template>
  <div class="resume-wrapper">
    <el-collapse class="resume-collapse" v-model="activeNames">
      <el-collapse-item title="在线简历" name="1">
        <resume-table />
      </el-collapse-item>
      <el-collapse-item title="附件简历" name="2">
        <file-list />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import ResumeTable from '@/components/account/resume/resume-table'
import FileList from '@/components/account/resume/file-list'
import { omit } from 'lodash'
import { strToArr, parseToPeriodRange } from '@/utils/parsers'

export default {
  components: {
    ResumeTable,
    FileList
  },

  data() {
    return {
      activeNames: ['1']
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.resume-wrapper {
  .resume-collapse {
    ::v-deep .el-collapse-item__header {
      font-size: 14px;
    }
    ::v-deep .el-collapse-item__content {
      padding-top: 10px;
    }
  }
}
</style>
