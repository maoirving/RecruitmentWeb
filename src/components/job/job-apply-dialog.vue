<template>
  <base-dialog
    dialog-top="20vh"
    dialog-width="35%"
    title="选择需要投递的简历"
    :visible.sync="dialogVisible"
    save-btn-text="立即投递"
    @close="handleClose"
    @save="applyJob"
  >
    <base-form
      slot="dialog-content"
      ref="resumeFileFormRef"
      :form-items="formItems"
      :form-data="resumeFileForm"
    />
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { getResumeOptions } from '@/utils/data-source'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    BaseDialog,
    BaseForm
  },

  props: {
    jobId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialogVisible: false,
      resumeFiles: [],
      resumeOptions: [],
      resumeFileForm: {
        resumeId: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
      }
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    }),
    ...mapGetters('user', ['isAuthenticated']),
    formItems() {
      return [
        {
          label: '我的简历',
          prop: 'resumeId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.resumeOptions
            }
          }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.dialogVisible = false
    },

    async applyJob() {
      this.$refs.resumeFileFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认申请该职位并投递简历？', { type: 'warning' }).then(async () => {
          const response = await this.$axios.post('/applications', {
            userId: this.userId,
            jobId: this.jobId,
            resumeId: this.resumeFileForm.resumeId,
            handledStatus: 0
          })
          if (!response.data.success) {
            return this.$message.error('申请失败，请重试')
          }
          this.$message.success('申请成功')
          this.handleClose()
        })
      })
    }
  },

  async mounted() {
    if (this.isAuthenticated) {
      this.resumeOptions = await getResumeOptions(this.userId)
    }
  }
}
</script>
