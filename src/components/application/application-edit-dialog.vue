<template>
  <base-table-dialog
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
  </base-table-dialog>
</template>

<script>
import BaseTableDialog from '@/components/base/base-table-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { getJobOptions, getUserOptions } from '@/utils/data-source'
import { parseToText } from '@/utils/html-text'
import { parseToHtml } from '@/utils/html-text'

export default {
  components: {
    BaseTableDialog,
    BaseForm
  },

  data() {
    return {
      dialogVisible: false,
      outerRow: null,
      tableThis: null,
      jobOptions: [],
      userOptions: [],
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
        const row = cloneDeep(this.outerRow)
        if (row) {
          this.applicationForm = pick(row, ['id', 'userId', 'jobId', 'resumeId'])
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
          prop: 'userId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.userOptions
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
              this.tableThis.reload()
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
      application.introduction = parseToHtml(application.introduction)
      const params = omitBy(application, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/applications`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/applications/${applicationId}`, params)
        return editRes.data.success
      }
    },
    async getJobOptions() {
      const { data } = await this.$axios.get('/jobs/options')
      return data && data.options
    },
    async getUserOptions() {
      const { data } = await this.$axios.get('/users/options')
      return data && data.options
    }
  },

  async mounted() {
    this.jobOptions = await getJobOptions()
    this.userOptions = await getUserOptions()
  }
}
</script>
