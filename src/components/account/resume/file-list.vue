<template>
  <div class="file-list-wrapper">
    <div class="list-header">
      <el-button v-if="files.length <= 3" size="mini" round @click="showUploadingDialog">
        上传
      </el-button>
    </div>
    <ul class="unstyle-list file-list">
      <li class="file-list-item" v-for="(file, index) in files" :key="index">
        <div>
          <i class="el-icon-document"></i>
          {{ `${index + 1}. ${file.name}` }}
        </div>
        <div class="btn-holder">
          <el-button size="mini" round @click="showFileDialog">查看</el-button>
          <el-button type="danger" size="mini" round @click="handleDelete(file.id)">
            删除
          </el-button>
        </div>
      </li>
    </ul>
    <pdf-dialog :visible.sync="dialogVisible" @close-dialog="dialogVisible = false" />
    <file-uploading-dialog
      :visible.sync="uploadingDialogVisible"
      @close-dialog="uploadingDialogVisible = false"
    />
  </div>
</template>

<script>
import PdfDialog from '@/components/account/resume/pdf-dialog'
import FileUploadingDialog from '@/components/account/resume/file-uploading-dialog'

export default {
  components: {
    PdfDialog,
    FileUploadingDialog
  },

  props: {
    files: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      dialogVisible: false,
      uploadingDialogVisible: false
    }
  },

  methods: {
    showFileDialog() {
      this.dialogVisible = true
    },

    showUploadingDialog() {
      this.uploadingDialogVisible = true
    },

    handleDelete(id) {
      this.$confirm('确认删除该简历？', { type: 'warning' })
        .then(() => {
          this.$message.success('删除成功！')
          console.log(id)
          this.$emit('close-dialog')
        })
        .catch(() => {})
    }
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
