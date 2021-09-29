<template>
  <div>
    <el-dialog
      class="awesome-scrollbar profile-dialog"
      title="处理求职申请"
      width="40%"
      :center="true"
      v-bind="$attrs"
      destroy-on-close
      :before-close="handleClose"
      @closed="closed"
    >
      <base-form ref="formRef" :form-items="formItems" :form-data="applicationForm" />
      <div slot="footer" class="text-right">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleApplicaion">处理</el-button>
      </div>
    </el-dialog>
    <interview-dialog
      ref="interviewDialogRef"
      :visible.sync="interviewDialogVisible"
      @close-dialog="interviewDialogVisible = false"
    />
  </div>
</template>

<script>
import BaseForm from '@/components/base/base-form'
import { applicationHandleOptions } from '@/utils/data-source'
import InterviewDialog from '@/components/interview/interview-dialog'
import { omitBy } from 'lodash'
import { mapState } from 'vuex'

export default {
  components: {
    BaseForm,
    InterviewDialog
  },

  props: {},

  data() {
    return {
      applicationId: '',
      receiverId: '',
      applicationForm: {
        handledStatus: '',
        content: ''
      },
      tableThis: null,
      formItems: [
        {
          label: '处理申请',
          prop: 'handledStatus',
          rule: 'required',
          control: {
            component: 'base-radio-group',
            attrs: {
              options: applicationHandleOptions
            }
          }
        },
        {
          label: '消息内容',
          prop: 'content',
          control: {
            attrs: {
              type: 'textarea',
              rows: 4,
              placeholder: '请输入内容（拒绝的理由或恭喜的话语等）...'
            }
          }
        }
      ],
      interviewDialogVisible: false
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    })
  },

  methods: {
    handleClose() {
      const resultObj = omitBy(this.applicationForm, val => val === '')
      if (JSON.stringify(resultObj) === '{}') {
        this.$emit('close-dialog')
      } else {
        this.$confirm('填写内容不会保存，确认关闭？', { type: 'warning' })
          .then(() => {
            this.$emit('close-dialog')
          })
          .catch(() => {})
      }
    },

    closed() {
      this.$refs.formRef.$refs['form'].resetFields()
    },

    handleApplicaion() {
      this.$refs.formRef.$refs['form'].validate(async valid => {
        if (!valid) return
        this.$confirm('确认处理？', { type: 'warning' })
          .then(async () => {
            this.$emit('close-dialog')
            const res = await this.$axios.put(`/applications/${this.applicationId}`, {
              handledStatus: this.applicationForm.handledStatus
            })
            let messageId = ''
            if (this.applicationForm.content) {
              const messageRes = await this.$axios.post(`/messages`, {
                content: this.applicationForm.content,
                senderId: parseInt(this.userId),
                receiverId: this.receiverId,
                applicationId: this.applicationId
              })
              if (!messageRes.data.success) {
                return
              }
              messageId = messageRes.data.messages.id
              console.log(messageId)
            }

            this.tableThis.reload()
            if (this.applicationForm.handledStatus === -1) {
              return this.$message.success('处理成功！')
            } else {
              this.$confirm('处理成功！是否立即邀请面试？', { type: 'success' })
                .then(() => {
                  this.$refs.interviewDialogRef.messageId = messageId
                  this.interviewDialogVisible = true
                })
                .catch(() => {})
            }
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-dialog {
  .el-radio {
    margin-right: $gap-sm;
  }
}
</style>
