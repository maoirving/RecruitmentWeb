<template>
  <el-dialog
    title="邀请面试"
    width="40%"
    :center="true"
    v-bind="$attrs"
    :before-close="handleClose"
  >
    <div class="dialog-content">
      <interview-form :interview="interviewForm" />
    </div>
    <div slot="footer" class="text-right">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSend">发送</el-button>
    </div>
  </el-dialog>
</template>

<script>
import InterviewForm from '@/components/interview/interview-form.vue'
import { omitBy } from 'lodash'
import moment from 'moment'

export default {
  components: {
    InterviewForm
  },

  data() {
    return {
      applicationId: '',
      interviewForm: {
        interviewDate: '',
        interviewTime: '',
        address: '',
        tip: ''
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close-dialog')
    },

    handleSend() {
      this.$confirm('确认发送该面试邀请？', { type: 'warning' })
        .then(async () => {
          const interviewAt = `${moment(this.interviewForm.interviewDate)
            .utcOffset(0)
            .format('YYYY-MM-DD')} ${this.interviewForm.interviewTime}`
          const params = {
            interviewAt: new Date(interviewAt),
            address: this.interviewForm.address,
            tip: this.interviewForm.tip,
            applicationId: this.applicationId
          }

          const res = await this.$axios.post(
            `/interviews`,
            omitBy(params, val => val === '')
          )
          console.log(res)
          if (!res.data.success) {
            this.$message.error('发送失败')
          }
          this.$message.success('发送成功')
          this.$emit('close-dialog')
        })
        .catch(() => {})
    }
  }
}
</script>

<style></style>
