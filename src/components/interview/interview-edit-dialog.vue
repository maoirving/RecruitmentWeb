<template>
  <base-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
    :disabled="disabled"
  >
    <template slot="dialog-form">
      <base-form ref="interviewFormRef" :form-items="formItems" :form-data="interviewForm" />
      <interview-form ref="interviewRef" :interview="interviewForm" />
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import InterviewForm from '@/components/interview/interview-form.vue'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { getApplicatonIdOptions } from '@/utils/data-source'
import moment from 'moment'

export default {
  components: {
    BaseDialog,
    InterviewForm,
    BaseForm
  },

  data() {
    return {
      dialogVisible: false,
      outerRow: null,
      tableThis: null,
      applicatonIdOptions: [],
      interviewForm: {
        id: '',
        applicationId: '',
        interviewDate: '',
        interviewTime: '',
        address: '',
        tip: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerRow)
        if (row) {
          this.interviewForm = pick(row, ['id', 'applicationId', 'address', 'tip'])
          this.interviewForm.interviewDate = moment(row.interviewAt)
            .utcOffset(0)
            .format('YYYY-MM-DD')
          this.interviewForm.interviewTime = moment(row.interviewAt)
            .utcOffset(0)
            .format('HH:mm')
        }
      }
    }
  },

  computed: {
    isEdit() {
      return this.outerRow && this.outerRow.id !== ''
    },
    disabled() {
      return this.outerRow && this.outerRow.status
    },
    dialogTitle() {
      return this.isEdit ? (this.disabled ? '查看面试' : '编辑面试') : '新增面试'
    },

    formItems() {
      return [
        {
          label: '申请id',
          prop: 'applicationId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.applicatonIdOptions
            }
          }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.interviewForm = {
        id: '',
        applicationId: '',
        interviewDate: '',
        interviewTime: '',
        address: '',
        tip: ''
      }
      this.$refs.interviewFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      // console.log(this.$refs)

      this.$refs.interviewFormRef.$refs['form'].validate(valid => {
        this.$refs.interviewRef.$refs.interviewFormRef.$refs['form'].validate(valid2 => {
          if (!valid || !valid2) return
          this.$confirm('确认保存该面试？', { type: 'warning' })
            .then(async () => {
              const isSuccessful = await this.saveInterview()
              if (isSuccessful) {
                this.$message.success('保存成功')
                this.tableThis.reload()
                this.handleClose()
              } else {
                this.$message.error('保存失败，请重试')
              }
            })
            .catch(() => {})
        })
      })
    },
    async saveInterview() {
      const interviewId = this.interviewForm.id
      const interview = omit(this.interviewForm, ['id', 'interviewDate', 'interviewTime'])
      interview.interviewAt = `${moment(this.interviewForm.interviewDate)
        .utcOffset(0)
        .format('YYYY-MM-DD')} ${this.interviewForm.interviewTime}`
      const params = omitBy(interview, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/interviews`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/interviews/${interviewId}`, params)
        return editRes.data.success
      }
    }
  },
  async mounted() {
    this.applicatonIdOptions = await getApplicatonIdOptions()
  }
}
</script>
