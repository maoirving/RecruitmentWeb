<template>
  <base-dialog
    dialog-width="40%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @save="handleSave"
    :disabled="disabled"
  >
    <template slot="dialog-form">
      <base-form ref="messageFormRef" :form-items="formItems" :form-data="messageForm" />
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base/base-dialog'
import BaseForm from '@/components/base/base-form'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { getUserOptions, getApplicatonIdOptions } from '@/utils/data-source'
import moment from 'moment'

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
      userOptions: [],
      applicatonIdOptions: [],
      messageForm: {
        id: '',
        senderId: '',
        receiverId: '',
        applicationId: '',
        content: ''
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        const row = cloneDeep(this.outerRow)
        if (row) {
          this.messageForm = pick(row, ['id', 'senderId', 'receiverId', 'applicationId', 'content'])
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
      return this.isEdit ? (this.disabled ? '查看消息' : '编辑消息') : '新增消息'
    },

    formItems() {
      return [
        {
          label: '发送方',
          prop: 'senderId',
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
          label: '接受方',
          prop: 'receiverId',
          rule: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value === this.messageForm.senderId) {
                    callback(new Error('接收方和发送方不能相同'))
                  } else {
                    callback()
                  }
                } else {
                  callback('必填')
                }
              }
            }
          ],
          control: {
            component: 'base-select',
            attrs: {
              clearable: true,
              options: this.userOptions
            }
          }
        },
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
        },
        {
          label: '消息内容',
          prop: 'content',
          control: {
            attrs: {
              type: 'textarea',
              rows: 4
            }
          }
        }
      ]
    }
  },

  methods: {
    handleClose() {
      this.messageForm = {
        id: '',
        senderId: '',
        receiverId: '',
        applicationId: '',
        content: ''
      }
      this.$refs.messageFormRef.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.messageFormRef.$refs['form'].validate(valid => {
        if (!valid) return
        this.$confirm('确认保存该消息？', { type: 'warning' })
          .then(async () => {
            const isSuccessful = await this.saveMessage()
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
    async saveMessage() {
      const messageId = this.messageForm.id
      const message = omit(this.messageForm, ['id'])
      const params = omitBy(message, val => val === '')
      if (!this.isEdit) {
        const res = await this.$axios.post(`/messages`, params)
        return res.data.success
      } else {
        const editRes = await this.$axios.put(`/messages/${messageId}`, params)
        return editRes.data.success
      }
    }
  },
  async mounted() {
    this.userOptions = await getUserOptions()
    this.applicatonIdOptions = await getApplicatonIdOptions()
  }
}
</script>
