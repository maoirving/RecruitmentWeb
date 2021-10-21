<template>
  <base-dialog
    class="upload-dialog"
    title="上传简历"
    dialog-width="36%"
    :visible.sync="dialogVisible"
    save-btn-text="上传"
    @close="handleClose"
    @save="handleUpload"
  >
    <el-upload
      slot="dialog-content"
      class="upload-wrapper"
      ref="upload"
      drag
      action="http://127.0.0.1:3000/upload/resume"
      :multiple="false"
      :limit="1"
      accept="application/pdf"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过{{ limit }}M</div>
    </el-upload>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseUpload from '@/components/base/base-upload'
import { mapState } from 'vuex'

export default {
  components: {
    BaseDialog,
    BaseUpload
  },

  props: {
    limit: {
      type: Number,
      default: 3 // 3MB
    }
  },

  data() {
    return {
      dialogVisible: false,
      uploaded: false
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    })
  },

  methods: {
    handleClose() {
      if (this.$refs.upload?.uploadFiles.length && !this.uploaded) {
        this.$confirm('文件还没上传，确认关闭？', { type: 'warning' })
          .then(() => {
            this.dialogVisible = false
            this.$emit('close-dialog')
            this.$refs.upload.clearFiles()
          })
          .catch(() => {})
      } else {
        this.dialogVisible = false
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning('只能同时上传一份简历')
    },

    beforeUpload(file) {
      console.log(file)
      const isPDF = file.type === 'application/pdf'
      const isInLimit = file.size / 1024 / 1024 <= this.limit

      if (!isPDF) {
        this.$message.error('上传的文件只能是 PDF 格式!')
      }
      if (!isInLimit) {
        this.$message.error(`文件大小不能超过${this.limit}MB!`)
      }
      if (!isPDF || !isInLimit) {
        return false
      }
    },

    handleUpload() {
      this.$confirm('确认上传该简历？', { type: 'warning' })
        .then(async () => {
          await this.$refs.upload.submit()
        })
        .catch(() => {})
    },
    async handleSuccess(response, file, fileList) {
      this.uploaded = true
      const { data } = await this.$axios.post('/resumes/files', {
        name: file.name,
        url: response.data.url,
        userId: this.userId
      })
      if (data.success) {
        this.dialogVisible = false
        this.$message.success('上传成功!')
        this.$emit('reload')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-dialog {
  .upload-wrapper {
    text-align: center;
  }
}
</style>
