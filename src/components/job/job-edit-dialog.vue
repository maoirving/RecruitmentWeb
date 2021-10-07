<template>
  <base-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :disabled="disabled"
    @close="handleClose"
    @save="handleSave(false)"
  >
    <base-form
      slot="dialog-content"
      ref="jobFormRef"
      :form-items="formItems"
      :form-data="jobForm"
      :disabled="disabled"
    >
      <div slot="salary">
        <el-input-number
          v-model="jobForm.minSalary"
          :step="1"
          :min="1"
        ></el-input-number>
        <span class="horizontal-line"> - </span>
        <el-input-number
          v-model="jobForm.maxSalary"
          :step="1"
          :min="jobForm.minSalary + 1"
        ></el-input-number>
        <span class="suffix">
          K
        </span>
      </div>
    </base-form>
    <el-button
      slot="extra-button"
      type="primary"
      size="small"
      @click="handleSave(true)"
      :disabled="disabled"
    >
      保存并发布
    </el-button>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import {
  jobTypeOptions,
  getCompanyOptions,
  educationBackgroundOptions,
  workExperienceOptions
} from '@/utils/data-source'
import { parseToText, parseToHtml } from '@/utils/parsers'

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
      companyOptions: [],
      jobForm: {
        name: '',
        type: '',
        recruitingNnumbers: '',
        minSalary: 1,
        maxSalary: 2,
        workLocation: '',
        workExperience: '',
        educationBackground: '',
        description: '',
        skill: '',
        companyId: '',
        status: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerData)
        if (row) {
          this.jobForm = Object.assign(
            this.jobForm,
            pick(row, [
              'id',
              'name',
              'type',
              'recruitingNnumbers',
              'workLocation',
              'workExperience',
              'educationBackground',
              'description',
              'skill',
              'companyId',
              'status'
            ])
          )
          this.jobForm.description = parseToText(row.description)
          this.jobForm.skill = parseToText(row.skill)
          let salaryArr = row.salary.substr(0, row.salary.length - 1).split('-')
          this.jobForm.minSalary = parseInt(salaryArr[0])
          this.jobForm.maxSalary = parseInt(salaryArr[1])
        }
      }
    },
    jobForm: {
      handler(newObj) {
        if (newObj.maxSalary < newObj.minSalary + 1) {
          newObj.maxSalary = newObj.minSalary + 1
        }
      },
      deep: true
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
      return this.isEdit
        ? this.disabled
          ? '查看职位'
          : '编辑职位'
        : '新增职位'
    },

    formItems() {
      return [
        {
          label: '职位名称',
          prop: 'name',
          rule: 'required'
        },
        {
          label: '职位类型',
          prop: 'type',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: jobTypeOptions
            }
          }
        },
        {
          label: '所属公司',
          prop: 'companyId',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.companyOptions
            }
          }
        },
        {
          label: '招聘人数',
          prop: 'recruitingNnumbers',
          rule: 'required',
          control: {
            component: 'el-input-number',
            attrs: {
              step: 1,
              min: 1
            }
          }
        },
        {
          label: '工资范围',
          slot: 'salary'
        },
        {
          label: '学历要求',
          prop: 'educationBackground',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: educationBackgroundOptions
            }
          }
        },
        {
          label: '工作经验',
          prop: 'workExperience',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: workExperienceOptions
            }
          }
        },
        {
          label: '工作地点',
          rule: 'required',
          prop: 'workLocation',
          control: {
            attrs: {
              placeholder: '请输入工作地点（城市+街道+门牌号...）'
            }
          }
        },
        {
          label: '职位描述',
          prop: 'description',
          control: {
            attrs: {
              type: 'textarea',
              rows: 6,
              placeholder: '请输入描述内容...'
            }
          }
        },
        {
          label: '技能要求',
          prop: 'skill',
          control: {
            attrs: {
              type: 'textarea',
              rows: 6,
              placeholder: '请输入技能要求...'
            }
          }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.jobForm = {
        name: '',
        type: '',
        recruitingNnumbers: '',
        minSalary: 1,
        maxSalary: 2,
        workLocation: '',
        workExperience: '',
        educationBackground: '',
        description: '',
        skill: '',
        companyId: '',
        status: ''
      }
      this.$refs.jobFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave(isPost) {
      this.$refs.jobFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        const confirmText = isPost ? '保存并发布' : '保存'
        const tipText = isPost ? '发布' : '保存'
        this.$confirm(`确认${confirmText}该职位？`, { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveJob({ status: isPost })
            if (isSuccessful) {
              this.$message.success(`${tipText}成功`)
              this.outerThis.reload()
              this.handleClose()
            } else {
              this.$message.error(`${tipText}失败，请重试`)
            }
          })
          .catch(() => {})
      })
    },
    async saveJob(extraParams) {
      const jobId = this.jobForm.id
      const job = omit(this.jobForm, ['minSalary', 'maxSalary'])
      job.salary = `${this.jobForm.minSalary}-${this.jobForm.maxSalary}K`
      job.description = parseToHtml(job.description)
      job.skill = parseToHtml(job.skill)
      const params = omitBy(job, val => val === '')
      if (extraParams) {
        Object.assign(params, extraParams)
      }
      if (!this.isEdit) {
        const res = await this.$axios.post(`/jobs`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/jobs/${jobId}`, params)
        return editRes.data.success
      }
    }
  },

  async mounted() {
    this.companyOptions = await getCompanyOptions()
  }
}
</script>
