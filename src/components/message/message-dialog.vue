<template>
  <el-dialog title="消息处理" width="40%" v-bind="$attrs" :before-close="handleClose">
    <div class="dialog-content">
      <interview-form :interview="InterviewForm" disabled />
      <base-form :form-items="formItems" :form-data="message"> </base-form>
    </div>
    <div slot="footer" class="text-right">
      <el-button @click="handeRefuse">拒绝</el-button>
      <el-button type="primary" @click="handleAccept">接受</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BaseForm from '@/components/base/base-form'
import InterviewForm from '@/components/interview/interview-form.vue'

export default {
  components: {
    BaseForm,
    InterviewForm
  },

  data() {
    return {
      resumes: [],
      InterviewForm: {
        interviewDate: '',
        interviewTime: '',
        address: '',
        tip: ''
      },
      message: {
        content: '恭喜您通过我们公司的一轮筛选，现邀请您到我司参加面试',
        reply: ''
      },

      formItems: [
        {
          label: '消息内容',
          prop: 'content',
          control: {
            attrs: {
              type: 'textarea',
              rows: 4,
              disabled: true
            }
          }
        },
        {
          label: '回复',
          prop: 'reply',
          control: {
            attrs: {
              type: 'textarea',
              rows: 4,
              placeholder: '请输入内容（改时间，拒绝的理由等）'
            }
          }
        }
      ]
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

    handeRefuse() {
      this.$confirm('确认拒绝该面试邀请？', { type: 'warning' })
        .then(() => {
          this.$message.success('已拒绝')
          this.$emit('close-dialog')
        })
        .catch(() => {})
    },

    handleAccept() {
      this.$confirm('确认接受该面试邀请？', { type: 'warning' })
        .then(() => {
          this.$message.success('已接受')
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
