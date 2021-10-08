<template>
  <div class="file-list-wrapper">
    <div class="list-header">
      <el-button v-if="resumeFiles.length <= 3" size="mini" round @click="showUploadingDialog">
        上传
      </el-button>
    </div>
    <ul class="unstyle-list file-list">
      <li class="file-list-item" v-for="(file, index) in resumeFiles" :key="index">
        <div>
          <i class="el-icon-document"></i>
          {{ `${index + 1}. ${file.name}` }}
        </div>
        <div class="btn-holder">
          <el-button size="mini" round @click="showFileDialog(file.url)">查看</el-button>
          <el-button type="danger" size="mini" round @click="handleDelete(file.id)">
            删除
          </el-button>
        </div>
      </li>
    </ul>
    <pdf-dialog ref="resumeReadRef" />
    <file-uploading-dialog
      :visible.sync="uploadingDialogVisible"
      @close-dialog="uploadingDialogVisible = false"
    />
  </div>
</template>

<script>
import PdfDialog from '@/components/account/resume/pdf-dialog'
import FileUploadingDialog from '@/components/account/resume/file-uploading-dialog'
import { mapState } from 'vuex'

export default {
  components: {
    PdfDialog,
    FileUploadingDialog
  },

  data() {
    return {
      uploadingDialogVisible: false,
      resumeFiles: []
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    })
  },

  methods: {
    async getResumeFiles() {
      const { data } = await this.$axios.get('/resumes/files/list', {
        params: {
          userId: this.userId
        }
      })
      this.resumeFiles = data.resumeFiles
    },
    showFileDialog(url) {
      this.$refs.resumeReadRef.url = url
      this.$refs.resumeReadRef.dialogVisible = true
    },

    showUploadingDialog() {
      this.uploadingDialogVisible = true
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
          this.getResumeFiles()
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
.file-list-wrapper {
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
