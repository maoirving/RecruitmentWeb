<template>
  <div>
    <base-dialog
      dialog-width="40%"
      title="处理求职申请"
      save-btn-text="处理"
      :visible.sync="dialogVisible"
      @close="handleClose"
      @save="handleSave"
    >
      <base-form
        slot="dialog-form"
        ref="handleFormRef"
        :form-items="formItems"
        :form-data="applicationForm"
      />
    </base-dialog>
    <interview-dialog
      ref="interviewDialogRef"
      :visible.sync="interviewDialogVisible"
      @close-dialog="interviewDialogVisible = false"
    />
  </div>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { applicationHandleOptions } from '@/utils/data-source'
import InterviewDialog from '@/components/interview/interview-dialog'
import { omitBy } from 'lodash'
import { mapState } from 'vuex'

export default {
  components: {
    BaseDialog,
    BaseForm,
    InterviewDialog
  },

  props: {},

  data() {
    return {
      dialogVisible: false,
      outerRow: null,
      tableThis: null,
      receiverId: '',
      companyId: '',
      applicationForm: {
        id: '',
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
      this.applicationForm = {
        id: '',
        handledStatus: '',
        content: ''
      }
      this.$refs.handleFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.handleFormRef.$refs['form'].validate(async valid => {
        if (!valid) return
        this.$confirm('确认处理？', { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveApplication()
            if (isSuccessful) {
              this.tableThis.reload()
              this.handleClose()
              if (this.applicationForm.handledStatus === -1) {
                return this.$message.success('处理成功！')
              } else {
                this.$confirm('处理成功！是否立即邀请面试？', { type: 'success' })
                  .then(() => {
                    this.$refs.interviewDialogRef.applicationId = this.applicationId
                    this.interviewDialogVisible = true
                  })
                  .catch(() => {})
              }
            } else {
              this.$message.error('保存失败，请重试')
            }
          })
          .catch(() => {})
      })
    },

    async saveApplication() {
      const applicationId = this.applicationForm.id
      const res = await this.$axios.put(`/applications/${applicationId}`, {
        handledStatus: this.applicationForm.handledStatus
      })
      if (res.data.success && this.applicationForm.content) {
        const messageRes = await this.$axios.post(`/messages`, {
          content: this.applicationForm.content,
          senderId: parseInt(this.userId),
          receiverId: this.receiverId,
          applicationId: applicationId
        })
        return messageRes.data.success
      } else {
        return res.data.success
      }
    }
  }
}
</script>
