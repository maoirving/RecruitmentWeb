<template>
  <el-dialog
    :title="dialogTitle"
    width="50%"
    :center="true"
    v-bind="$attrs"
    destroy-on-close
    :before-close="handleClose"
    @closed="closed"
  >
    <div class="dialog-content">
      <base-form ref="jobFormRef" :form-items="formItems" :form-data="jobForm">
        <div slot="salary">
          <el-input-number v-model="jobForm.minSalary" :step="1" :min="1"></el-input-number>
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
    </div>
    <div slot="footer" class="text-right">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSave(false)">保存</el-button>
      <el-button type="primary" @click="handleSave(true)">保存并发布</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BaseForm from '@/components/base/base-form'
import { omit, omitBy } from 'lodash'
import moment from 'moment'
import {
  jobTypeOptions,
  educationBackgroundOptions,
  workExperienceOptions,
  financingStageOptions,
  scaleOptions
} from '@/utils/data-source'
import { parseToHtml } from '@/utils/html-text'

export default {
  components: {
    BaseForm
  },

  data() {
    return {
      jobId: '',
      isEdit: true,
      tableThis: null,
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
        companyId: 1,
        status: ''
      }
    }
  },

  computed: {
    dialogTitle() {
      return this.jobId ? (this.isEdit ? '编辑职位' : '查看职位') : '新增职位'
    },
    formItems() {
      return [
        {
          label: '职位名称',
          prop: 'name',
          rule: 'required',
          control: {
            attrs: {
              disabled: !this.isEdit
            }
          }
        },
        {
          label: '职位类型',
          prop: 'type',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: jobTypeOptions,
              disabled: !this.isEdit
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
              min: 1,
              disabled: !this.isEdit
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
              options: educationBackgroundOptions,
              disabled: !this.isEdit
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
              options: workExperienceOptions,
              disabled: !this.isEdit
            }
          }
        },
        {
          label: '工作地点',
          prop: 'workLocation',
          control: {
            attrs: {
              placeholder: '请输入工作地点（城市+街道+门牌号...）',
              disabled: !this.isEdit
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
              placeholder: '请输入描述内容...',
              disabled: !this.isEdit
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
              placeholder: '请输入技能要求...',
              disabled: !this.isEdit
            }
          }
        }
      ]
    }
  },

  watch: {
    jobForm: {
      handler(newObj) {
        if (newObj.maxSalary < newObj.minSalary + 1) {
          newObj.maxSalary = newObj.minSalary + 1
        }
      },
      deep: true
    }
  },

  methods: {
    handleClose() {
      this.$emit('close-dialog')
    },
    closed() {
      this.$refs.jobFormRef.$refs['form'].resetFields()
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
              this.tableThis.reload()
              this.$emit('close-dialog')
            } else {
              this.$message.error(`${tipText}失败，请重试`)
            }
          })
          .catch(() => {})
      })
    },
    async saveJob(extraParams) {
      const job = omit(this.jobForm, ['minSalary', 'maxSalary'])
      job.salary = `${this.jobForm.minSalary}-${this.jobForm.maxSalary}K`
      job.description = parseToHtml(job.description)
      const params = omitBy(job, val => val === '')
      if (extraParams) {
        Object.assign(params, extraParams)
      }
      if (!this.jobId) {
        const res = await this.$axios.post(`/jobs`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/jobs/${this.jobId}`, params)
        return editRes.data.success
      }
    }
  }
}
</script>

<style></style>
