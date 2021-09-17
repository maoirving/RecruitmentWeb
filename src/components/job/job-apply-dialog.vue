<template>
  <el-dialog title="选择需要投递的简历" width="40%" v-bind="$attrs" :before-close="handleClose">
    <div class="dialog-content">
      <ul>
        <li v-for="(resume, index) in resumes" :key="index">{{ index + 1 }}.{{ resume.name }}</li>
      </ul>
    </div>
    <div slot="footer" class="text-right">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="applyJob">投递简历</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      resumes: []
    }
  },

  methods: {
    handleClose() {
      this.$emit('close-dialog')
    },

    getResumes() {
      const resume = {
        name: '毛欧文-web前端开发工程师'
      }
      for (let i = 0; i < 3; i++) {
        this.resumes.push(resume)
      }
    },

    applyJob() {
      this.$confirm('确认申请该职位并投递简历？', { type: 'warning' })
        .then(() => {
          this.$message.success('申请成功')
          this.$emit('close-dialog')
        })
        .catch(() => {})
    }
  },
  created() {
    this.getResumes()
  }
}
</script>

<style></style>
