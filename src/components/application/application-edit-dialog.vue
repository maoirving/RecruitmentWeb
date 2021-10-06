<template>
  <base-dialog
    dialog-width="40%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
    :disabled="disabled"
  >
    <base-form
      slot="dialog-form"
      label-width="94px"
      ref="applicationFormRef"
      :form-items="formItems"
      :form-data="applicationForm"
      :disabled="disabled"
    />
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { getJobOptions, getUserOptions, getResumeOptions } from '@/utils/data-source'

export default {
  components: {
    BaseDialog,
    BaseForm
  },

  data() {
    return {
      dialogVisible: false,
      outerData: null,
      outerThis: null,
      jobOptions: [],
      userOptions: [],
      resumeOptions: [],
      applicationForm: {
        id: '',
        userId: '',
        jobId: '',
        resumeId: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerData)
        if (row) {
          this.applicationForm = pick(row, ['id', 'userId', 'jobId', 'resumeId'])
        }
      }
    }
  },

  computed: {
    isEdit() {
      return this.outerData && this.outerData.id !== ''
    },
    disabled() {
      return this.outerData && this.outerData.status
    },
    dialogTitle() {
      return this.isEdit ? (this.disabled ? '查看申请' : '编辑申请') : '新增申请'
    },

    formItems() {
      return [
        {
          label: '职位名称',
          prop: 'jobId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.jobOptions
            }
          }
        },
        {
          label: '求职者',
          prop: 'userId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.userOptions
            }
          }
        },
        {
          label: '简历',
          prop: 'resumeId',
          visible: this.applicationForm.userId ? true : false,
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.resumeOptions.filter(
                option => option.userId === this.applicationForm.userId
              )
            }
          }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.applicationForm = {
        id: '',
        userId: '',
        jobId: '',
        resumeId: ''
      }
      this.$refs.applicationFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.applicationFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认保存该申请？', { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveApplication()
            if (isSuccessful) {
              this.$message.success('保存成功')
              this.outerThis.reload()
              this.handleClose()
            } else {
              this.$message.error('保存失败，请重试')
            }
          })
          .catch(() => {})
      })
    },
    async saveApplication() {
      const applicationId = this.applicationForm.id
      const application = omit(this.applicationForm, ['id'])
      const params = omitBy(application, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/applications`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/applications/${applicationId}`, params)
        return editRes.data.success
      }
    }
  },

  async mounted() {
    this.jobOptions = await getJobOptions()
    this.userOptions = await getUserOptions('worker')
    this.resumeOptions = await getResumeOptions()
  }
}
</script>
