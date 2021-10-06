<template>
  <div>
    <base-dialog
      dialog-width="35%"
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
    <interview-edit-dialog ref="editDialogRef" />
  </div>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { applicationHandleOptions } from '@/utils/data-source'
import InterviewEditDialog from '@/components/interview/interview-edit-dialog'
import { cloneDeep, pick } from 'lodash'

export default {
  components: {
    BaseDialog,
    BaseForm,
    InterviewEditDialog
  },

  data() {
    return {
      dialogVisible: false,
      outerData: null,
      outerThis: null,
      applicationForm: {
        id: '',
        handledStatus: ''
      },
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
        }
      ]
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerData)
        if (row) {
          this.applicationForm = pick(row, ['id', 'handledStatus'])
          if (row.handledStatus === 0) {
            this.applicationForm.handledStatus = ''
          }
        }
      }
    }
  },

  methods: {
    handleClose() {
      this.applicationForm = {
        id: '',
        handledStatus: ''
      }
      this.$refs.handleFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.handleFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认处理？', { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveApplication()
            if (isSuccessful) {
              if (this.applicationForm.handledStatus === -1) {
                this.$message.success('处理成功！')
                this.outerThis.reload()
                this.handleClose()
              } else {
                this.$confirm('处理成功！是否立即邀请面试？', { type: 'success' })
                  .then(() => {
                    this.$refs.editDialogRef.dialogVisible = true
                    this.$refs.editDialogRef.outerThis = this.outerThis
                    this.$refs.editDialogRef.interviewForm.applicationId = this.applicationForm.id
                    this.outerThis.reload()
                    this.handleClose()
                  })
                  .catch(() => {
                    this.outerThis.reload()
                    this.handleClose()
                  })
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
      return res.data.success
    }
  }
}
</script>
