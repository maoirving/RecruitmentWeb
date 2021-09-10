<template>
  <el-dialog title="消息处理" width="40%" v-bind="$attrs" :before-close="handleClose">
    <div class="dialog-content">
      <el-form label-width="80px">
        <el-form-item label="公司名称">
          <el-input v-model="message.company_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input type="textarea" v-model="message.content" rows="4" disabled></el-input>
        </el-form-item>
        <el-form-item label="面试时间">
          <el-col :span="10">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="message.interview_date"
              style="width: 100%;"
              disabled
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-time-select
              placeholder="起始时间"
              v-model="message.interview_time"
              :picker-options="{
                start: '09:00',
                step: '00:30',
                end: '18:00'
              }"
              disabled
            >
            </el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="面试地点">
          <el-input v-model="message.interview_address" disabled></el-input>
        </el-form-item>
        <el-form-item label="回复">
          <el-input
            type="textarea"
            placeholder="请输入内容（改时间，拒绝的理由等）"
            v-model="reply"
            rows="4"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right">
      <el-button @click="handeRefuse">拒绝</el-button>
      <el-button type="primary" @click="handleAccept">接受</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      resumes: [],
      message: {
        recruiter: '林女士',
        content: '恭喜您通过我们公司的一轮筛选，现邀请您到我司参加面试',
        company_name: '厉害的公司',
        interview_date: '2021-09-15',
        interview_time: '23:00',
        interview_address: '厦门市 思明区 软件园二期'
      },
      reply: ''
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
