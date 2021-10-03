<template>
  <el-dialog
    title="选择需要投递的简历"
    width="30%"
    :center="true"
    v-bind="$attrs"
    :before-close="handleClose"
  >
    <div class="dialog-content">
      <ul>
        <li v-for="(resume, index) in resumes" :key="index">{{ index + 1 }}.{{ resume.name }}</li>
      </ul>
    </div>
    <div slot="footer" class="text-right">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button type="primary" size="small" @click="applyJob">投递简历</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    jobId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      resumes: []
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    })
  },

  methods: {
    handleClose() {
      this.$emit('close-dialog')
    },

    getResumes() {
      const resume = {
        name: 'web前端开发工程师'
      }
      for (let i = 0; i < 3; i++) {
        this.resumes.push(resume)
      }
    },

    async applyJob() {
      this.$confirm('确认申请该职位并投递简历？', { type: 'warning' }).then(async () => {
        const response = await this.$axios.post('/applications', {
          userId: this.userId,
          jobId: this.jobId,
          handledStatus: 0
        })
        if (!response.data.success) {
          return this.$message.error('申请失败，请重试')
        }
        this.$message.success('申请成功')
        this.$emit('close-dialog')
      })
    }
  },
  created() {
    this.getResumes()
  }
}
</script>

<style></style>
