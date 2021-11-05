<template>
  <div class="resume-list-wrapper">
    <div class="list-header">
      <el-button v-if="resumeFiles.length <= 3" size="mini" round @click="showUploadingDialog">
        上传
      </el-button>
    </div>
    <ul class="unstyle-list file-list">
      <li class="file-list-item" v-for="(file, index) in resumeFiles" :key="index">
        <div>
          {{ `${index + 1}. ` }}
          <i class="el-icon-document"></i>
          {{ `${file.name}` }}
        </div>
        <div class="btn-holder">
          <el-button size="mini" round @click="showFileDialog(file.url)">查看</el-button>
          <el-button type="danger" size="mini" round @click="handleDelete(file.id)">
            删除
          </el-button>
        </div>
      </li>
    </ul>
    <resume-read-dialog ref="resumeReadRef" />
    <resume-upload-dialog ref="uploadDialogRef" @reload="reload" />
  </div>
</template>

<script>
import ResumeReadDialog from '@/components/account/resume/resume-read-dialog'
import ResumeUploadDialog from '@/components/account/resume/resume-upload-dialog'

export default {
  components: {
    ResumeReadDialog,
    ResumeUploadDialog
  },

  data() {
    return {
      resumeFiles: []
    }
  },

  methods: {
    async getResumeFiles() {
      const { data } = await this.$axios.get('/resumes/files/list')
      this.resumeFiles = data.resumeFiles
    },
    reload() {
      this.getResumeFiles()
    },
    showFileDialog(url) {
      this.$refs.resumeReadRef.url = url
      this.$refs.resumeReadRef.dialogVisible = true
    },

    showUploadingDialog() {
      this.$refs.uploadDialogRef.dialogVisible = true
    },

    handleDelete(id) {
      this.$confirm('确认删除该简历？', { type: 'warning' })
        .then(async () => {
          // return console.log(this)
          const { data } = await this.$axios.delete(`resumes/files/${id}`)
          if (!data.success) {
            return this.$message.error('删除失败，请重试！')
          }
          this.$message.success('删除成功！')
          this.reload()
        })
        .catch(() => {})
    }
  },

  mounted() {
    this.getResumeFiles()
  }
}
</script>

<style lang="scss" scoped>
.resume-list-wrapper {
  .list-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .file-list {
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      transition: all 0.3s;
      &:hover {
        background-color: #f2f5fa;
      }
      &:not(:last-child) {
        border-bottom: $solid-gray;
      }
    }
  }
}
</style>
