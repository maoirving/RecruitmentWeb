<template>
  <base-dialog
    dialog-width="40%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :hide-save-btn="isInWorker"
    @close="handleClose"
    @save="handleSave"
  >
    <template slot="dialog-content">
      <base-form
        ref="interviewFormRef"
        :form-items="formItems"
        :form-data="interviewForm"
        :disabled="isInWorker"
      />
      <interview-form
        ref="interviewRef"
        :interview="interviewForm"
        :disabled="isInWorker"
      />
    </template>
    <template v-if="isInWorker" slot="extra-button">
      <el-button type="danger" size="small" @click="handleAccept(false)">
        拒绝
      </el-button>
      <el-button type="primary" size="small" @click="handleAccept(true)">
        接受
      </el-button>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import InterviewForm from '@/components/interview/interview-form.vue'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { getApplicatonIdOptions, getUserOptions } from '@/utils/data-source'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    BaseDialog,
    InterviewForm,
    BaseForm
  },

  props: {
    withApplication: {
      type: Boolean,
      default: false
    },
    isInWorker: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialogVisible: false,
      outerData: null,
      outerThis: null,
      applicatonIdOptions: [],
      userOptions: [],
      interviewForm: {
        id: '',
        applicationId: '',
        recruiterId: '',
        interviewDate: '',
        interviewTime: '',
        address: '',
        tip: ''
      },
      matchedCompanyId: ''
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.interviewForm.applicationId) {
          this.matchedCompanyId = this.getMatchedCompanyId(
            this.interviewForm.applicationId
          )
        }
        const row = cloneDeep(this.outerData)
        if (row) {
          this.interviewForm = Object.assign(
            this.interviewForm,
            pick(row, ['id', 'applicationId', 'recruiterId', 'address', 'tip'])
          )
          this.interviewForm.interviewDate = moment(row.interviewAt).format(
            'YYYY-MM-DD'
          )
          this.interviewForm.interviewTime = moment(row.interviewAt).format(
            'HH:mm'
          )
        }
      }
    }
  },

  computed: {
    ...mapGetters('admin', ['isSuperAdmin']),
    isEdit() {
      return this.outerData && this.outerData.id !== ''
    },
    dialogTitle() {
      let text = ''
      if (this.isInWorker) {
        text = '面试邀请'
      } else {
        text = this.isEdit
          ? '编辑面试'
          : this.withApplication
          ? '新增面试'
          : '邀请面试'
      }
      return text
    },
    formItems() {
      let items = []
      const vm = this
      if (this.withApplication) {
        items.push({
          label: '申请id',
          prop: 'applicationId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.applicatonIdOptions
            },
            events: {
              change(value) {
                vm.matchedCompanyId = vm.getMatchedCompanyId(value)
              }
            }
          }
        })
      }
      if (this.isSuperAdmin) {
        items.push({
          label: '发送者',
          prop: 'recruiterId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.userOptions.filter(
                option => option.companyId === this.matchedCompanyId
              )
            }
          },
          visible: this.interviewForm.applicationId ? true : false
        })
      }
      return items
    }
  },

  methods: {
    getMatchedCompanyId(value) {
      const matchedApplication = this.applicatonIdOptions.find(
        item => item.value === value
      )
      return matchedApplication?.Job?.companyId
    },
    handleClose() {
      this.interviewForm = {
        id: '',
        applicationId: '',
        recruiterId: '',
        interviewDate: '',
        interviewTime: '',
        address: '',
        tip: ''
      }
      this.$refs.interviewFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      let isValid = false
      this.$refs.interviewRef.$refs.interviewFormRef.$refs['form'].validate(
        valid => {
          if (this.withApplication) {
            this.$refs.interviewFormRef.$refs['form'].validate(valid2 => {
              if (!valid || !valid2) return
              isValid = true
            })
          } else {
            if (!valid) return
            isValid = true
          }
        }
      )
      if (isValid) {
        this.$confirm('确认发送该面试邀请？', { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveInterview()
            if (isSuccessful) {
              this.$message.success('发送成功')
              this.outerThis.reload()
              this.handleClose()
            } else {
              this.$message.error('发送失败，请重试')
            }
          })
          .catch(() => {})
      }
    },
    async saveInterview() {
      const interviewId = this.interviewForm.id
      const interview = omit(this.interviewForm, [
        'id',
        'interviewDate',
        'interviewTime'
      ])
      interview.interviewAt = `${moment(
        this.interviewForm.interviewDate
      ).format('YYYY-MM-DD')} ${this.interviewForm.interviewTime}`
      const params = omitBy(interview, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/interviews`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(
          `/interviews/${interviewId}`,
          params
        )
        return editRes.data.success
      }
    },
    handleAccept(isAccepted) {
      const interviewId = this.interviewForm.id
      const handledText = isAccepted ? '接受' : '拒绝'
      const agreedStatus = isAccepted ? 1 : -1
      this.$confirm(`确认${handledText}该面试邀请？`, { type: 'warning' })
        .then(async () => {
          const res = await this.$axios.put(`/interviews/${interviewId}`, {
            agreedStatus: agreedStatus
          })
          if (!res.data.success) {
            this.$message.error(`${handledText}失败，请重试！`)
          } else {
            this.$message.success(`${handledText}成功！`)
          }
          this.outerThis.reload()
          this.handleClose()
        })
        .catch(() => {})
    }
  },

  async mounted() {
    if (!this.isInWorker) {
      this.applicatonIdOptions = await getApplicatonIdOptions()
      this.userOptions = await getUserOptions('recruiter')
    }
  }
}
</script>
