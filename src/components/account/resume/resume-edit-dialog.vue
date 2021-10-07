<template>
  <base-dialog
    class="resume-dialog"
    title="编辑简历"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
  >
    <template slot="dialog-content">
      <base-form
        class="resume-form"
        :form-items="formItems"
        :form-data="resumeForm"
      >
        <div slot="anticipantSalary">
          <div>
            <el-input-number
              v-model="resumeForm.minSalary"
              :step="1"
              :min="1"
            ></el-input-number>
            <span class="horizontal-line"> - </span>
            <el-input-number
              v-model="resumeForm.maxSalary"
              :step="1"
              :min="resumeForm.minSalary + 1"
            ></el-input-number>
            <span class="suffix">
              K
            </span>
          </div>
        </div>
      </base-form>
      <el-collapse class="resume-collapse" v-model="activeNames">
        <el-collapse-item
          class="resume-collapse-item"
          title="资格证书"
          name="certificates"
        >
          <el-form class="form-list">
            <el-form-item
              class="form-list-item"
              v-for="(certificate, i) in resumeForm.certificates"
              label="证书名称"
              :key="i"
            >
              <span v-if="resumeForm.certificates.length > 1" class="number">
                {{ i + 1 }}
              </span>
              <el-input
                v-model="certificate.name"
                placeholder="请输入证书名称"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-holder text-right">
            <el-button
              v-if="resumeForm.certificates.length > 1"
              type="danger"
              size="small"
              icon="el-icon-minus"
              plain
              circle
              @click="subAddition"
            />
            <el-button
              v-if="resumeForm.certificates.length < 5"
              type="success"
              size="small"
              icon="el-icon-plus"
              plain
              circle
              @click="addAddition"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import {
  parseToText,
  parseToHtml,
  arrToStr,
  parseToPeriodStr
} from '@/utils/parsers'

export default {
  components: {
    BaseDialog,
    BaseForm
  },

  data() {
    return {
      activeNames: ['certificates'],
      dialogVisible: false,
      formItems: [
        {
          label: '当前住址',
          prop: 'currentAddress'
        },
        {
          label: '期望职位',
          prop: 'anticipantJob'
        },
        {
          label: '期望工资',
          slot: 'anticipantSalary'
        },
        {
          label: '期望城市',
          prop: 'anticipantCity'
        },
        {
          label: '学校名称',
          prop: 'school'
        },
        {
          label: '专业',
          prop: 'specializedSubject'
        },
        {
          label: '就读时间',
          prop: 'schoolPeriod',
          control: {
            component: 'el-date-picker',
            attrs: {
              type: 'daterange',
              'range-separator': '至',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期'
            }
          }
        },
        {
          label: '公司名称',
          prop: 'workCompany'
        },
        {
          label: '在职时间',
          prop: 'workPeriod',
          control: {
            component: 'el-date-picker',
            attrs: {
              type: 'daterange',
              'range-separator': '至',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期'
            }
          }
        },
        {
          label: '工作内容',
          prop: 'workContent',
          control: {
            attrs: {
              type: 'textarea',
              rows: 6
            }
          }
        }
      ],
      collapse: {
        title: '资格证书',
        prop: 'certificates',
        formItems: [
          {
            label: '证书名称',
            prop: 'name'
          }
        ]
      },
      resumeForm: {
        id: '',
        currentAddress: '',
        anticipantJob: '',
        minSalary: '',
        maxSalary: '',
        anticipantCity: '',
        school: '',
        specializedSubject: '',
        schoolPeriod: '',
        workCompany: '',
        workPeriod: '',
        workContent: '',
        certificates: []
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = this.outerData
        if (row) {
          this.resumeForm = Object.assign(
            this.resumeForm,
            pick(row, [
              'id',
              'currentAddress',
              'anticipantJob',
              'anticipantCity',
              'school',
              'specializedSubject',
              'schoolPeriod',
              'workCompany',
              'workPeriod'
            ])
          )
          let salaryArr = row.anticipantSalary
            .substr(0, row.anticipantSalary.length - 1)
            .split('-')
          this.resumeForm.minSalary = parseInt(salaryArr[0])
          this.resumeForm.maxSalary = parseInt(salaryArr[1])
          this.resumeForm.workContent = parseToText(row.workContent)
          this.resumeForm.certificates = []
          row.certificates.forEach(item => {
            this.resumeForm.certificates.push({ name: item })
          })
        }
      }
    },
    resumeForm: {
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
    }
  },

  methods: {
    addAddition() {
      this.resumeForm.certificates.push({ name: '' })
    },
    subAddition() {
      this.resumeForm.certificates.pop()
    },
    handleClose() {
      // this.$refs.resumeFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$confirm('确认保存简历？', { type: 'warning' })
        .then(async () => {
          const isSuccessful = await this.saveResume()
          if (isSuccessful) {
            this.handleClose()
            this.outerThis.reload()
            this.$message.success('保存成功')
          } else {
            this.$message.error('保存失败，请重试')
          }
        })
        .catch(() => {})
    },
    async saveResume() {
      const resumeId = this.resumeForm.id
      const resume = omit(this.resumeForm, [
        'id',
        'minSalary',
        'maxSalary',
        'certificates'
      ])
      resume.anticipantSalary = `${this.resumeForm.minSalary}-${this.resumeForm.maxSalary}K`
      resume.workContent = parseToHtml(resume.workContent)
      resume.schoolPeriod = parseToPeriodStr(resume.schoolPeriod)
      resume.workPeriod = parseToPeriodStr(resume.workPeriod)
      resume.certificates = []
      this.resumeForm.certificates.forEach(item => {
        if (item.name) {
          resume.certificates.push(item.name)
        }
      })
      resume.certificates = arrToStr(resume.certificates)
      const params = omitBy(resume, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/resumes`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/resumes/${resumeId}`, params)
        return editRes.data.success
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.resume-dialog {
  .resume-collapse {
    margin-bottom: 30px;
    &-item {
      ::v-deep .el-collapse-item__header {
        color: #000;
        font-size: 14px;
      }
      .form-list {
        padding-left: 25px;
        &-item {
          position: relative;
          display: flex;

          .number {
            position: absolute;
            top: 9px;
            left: -90px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            font-size: 12px;
            color: #fff;
            border-radius: 50%;
            background-color: #ebb563;
          }
          .resume-form {
            width: 80%;
            .el-form-item {
              &:last-child {
                margin-bottom: 0;
              }
              .horizontal-line {
                margin-left: 10px;
                margin-right: 10px;
              }
              .suffix {
                margin-left: 5px;
              }
            }
          }
        }
      }
      .btn-holder {
        margin-top: 20px;
      }
    }
  }
}
</style>
