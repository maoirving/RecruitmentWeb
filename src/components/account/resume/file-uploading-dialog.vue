<template>
  <el-dialog
    class="uploading-dialog"
    title="上传简历"
    width="36%"
    :center="true"
    v-bind="$attrs"
    :before-close="handleClose"
  >
    <el-upload
      class="upload-wrapper"
      ref="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :multiple="false"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过500kb</div>
    </el-upload>
    <div slot="footer" class="text-right">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleUpload">上传</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  methods: {
    handleClose() {
      this.$confirm('文件还没上传，确认关闭？', { type: 'warning' })
        .then(() => {
          this.$emit('close-dialog')
          this.$refs.upload.clearFiles()
        })
        .catch(() => {})
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    handlePreview(file) {
      console.log(file)
    },

    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPDF) {
        this.$message.error('上传的文件只能是 PDF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('文件大小不能超过 2MB!')
      }
      if (isPDF && isLt2M) {
        this.$message.success('上传成功！')
        this.$emit('close-dialog')
      } else {
        return false
      }
    },

    handleUpload() {
      this.$confirm('确认上传该简历？', { type: 'warning' })
        .then(async () => {
          await this.$refs.upload.submit()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.uploading-dialog {
  .upload-wrapper {
    text-align: center;
  }
}
</style>
