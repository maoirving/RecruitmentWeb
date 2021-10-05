<template>
  <base-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
    :disabled="disabled"
  >
    <base-form
      slot="dialog-form"
      label-width="94px"
      ref="companyFormRef"
      :form-items="formItems"
      :form-data="companyForm"
      :disabled="disabled"
    />
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { companyTypeOptions, financingStageOptions, scaleOptions } from '@/utils/data-source'
import { parseToText } from '@/utils/html-text'
import { parseToHtml } from '@/utils/html-text'

export default {
  components: {
    BaseDialog,
    BaseForm
  },

  data() {
    return {
      dialogVisible: false,
      outerRow: null,
      tableThis: null,
      companyForm: {
        id: '',
        name: '',
        type: '',
        imageUrl: '',
        address: '',
        financingStage: '',
        introduction: '',
        scale: '',
        legalRepresentative: '',
        registeredCapital: '',
        registeredAt: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerRow)
        if (row) {
          this.companyForm = pick(row, [
            'id',
            'name',
            'type',
            'imageUrl',
            'address',
            'financingStage',
            'scale',
            'legalRepresentative',
            'registeredCapital',
            'registeredAt'
          ])
          this.companyForm.introduction = parseToText(row.introduction)
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
      return this.isEdit ? (this.disabled ? '查看公司' : '编辑公司') : '新增公司'
    },

    formItems() {
      const vm = this
      return [
        {
          label: '公司名称',
          prop: 'name',
          rule: 'required'
        },
        {
          label: '公司图片',
          prop: 'imageUrl',
          control: {
            component: 'base-upload',
            attrs: {
              limit: 2 * 1024 * 1024,
              tip: '图片限制2M以内',
              name: 'image'
            },
            events: {
              change(value) {
                vm.companyForm.imageUrl = value
              }
            }
          }
        },
        {
          label: '行业类别',
          prop: 'type',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: companyTypeOptions
            }
          }
        },
        {
          label: '公司地址',
          prop: 'address',
          rule: 'required',
          control: {
            attrs: {
              placeholder: '请输入公司地址（城市+街道+门牌号...）'
            }
          }
        },
        {
          label: '融资阶段',
          prop: 'financingStage',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: financingStageOptions
            }
          }
        },
        {
          label: '公司规模',
          prop: 'scale',
          rule: 'required',
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: scaleOptions
            }
          }
        },
        {
          label: '公司简介',
          prop: 'introduction',
          control: {
            attrs: {
              type: 'textarea',
              rows: 6,
              placeholder: '请输入内容...'
            }
          }
        },
        {
          label: '法定代表人',
          prop: 'legalRepresentative',
          rule: 'required'
        },
        {
          label: '注册资金',
          prop: 'registeredCapital',
          rule: 'required'
        },
        {
          label: '注册日期',
          prop: 'registeredAt',
          rule: 'required',
          control: {
            component: 'el-date-picker',
            attrs: {
              type: 'date',
              placeholder: '请选择日期'
            }
          }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.companyForm = {
        name: '',
        type: '',
        imageUrl: '',
        address: '',
        financingStage: '',
        introduction: '',
        scale: '',
        legalRepresentative: '',
        registeredCapital: '',
        registeredAt: ''
      }
      this.$refs.companyFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.companyFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认保存该公司？', { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveCompany()
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
    async saveCompany() {
      const companyId = this.companyForm.id
      const company = omit(this.companyForm, ['id'])
      company.introduction = parseToHtml(company.introduction)
      const params = omitBy(company, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/companies`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/companies/${companyId}`, params)
        return editRes.data.success
      }
    }
  }
}
</script>
