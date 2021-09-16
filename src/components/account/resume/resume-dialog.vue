<template>
  <el-dialog
    class="awesome-scrollbar resume-dialog"
    title="编辑简历"
    width="50%"
    top="10vh"
    :center="true"
    v-bind="$attrs"
    :before-close="handleClose"
    @closed="closed"
  >
    <el-form ref="resumeFormRef" :model="resumeForm" label-width="80px">
      <el-collapse class="resume-collapse" v-model="activeNames">
        <el-collapse-item
          class="resume-collapse-item"
          v-for="(collapse, index) in collapseList"
          :key="index"
          :title="collapse.title"
          :name="`${index + 1}`"
        >
          <ul class="form-list">
            <li class="form-list-item" v-for="(form, i) in resumeForm[collapse.prop]" :key="i">
              <span v-if="resumeForm[collapse.prop].length > 1" class="number">{{ i + 1 }}</span>
              <div class="form-item-wrapper">
                <el-form-item
                  v-for="(formItem, k) in collapse.form"
                  :key="k"
                  :label="formItem.label"
                >
                  <el-input
                    v-if="formItem.type === 'text' || formItem.type === 'textarea'"
                    :type="formItem.type"
                    :rows="formItem.type === 'textarea' ? 6 : undefined"
                    v-model="form[formItem.prop]"
                    :placeholder="`请输入${formItem.label}`"
                  >
                  </el-input>
                  <div v-if="formItem.type === 'input-number'">
                    <el-input-number
                      v-model="form[formItem.prop[0]]"
                      :step="1"
                      :min="1"
                    ></el-input-number>
                    <span class="horizontal-line"> - </span>
                    <el-input-number
                      v-model="form[formItem.prop[1]]"
                      :step="1"
                      :min="form[formItem.prop[0]] + 1"
                    ></el-input-number>
                    <span class="suffix">
                      K
                    </span>
                  </div>
                  <el-date-picker
                    v-if="formItem.type === 'date-range'"
                    v-model="form[formItem.prop]"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </li>
          </ul>
          <div v-if="collapse.withBtn" class="btn-holder text-right">
            <el-button
              v-if="resumeForm[collapse.prop].length > 1"
              type="danger"
              size="small"
              icon="el-icon-minus"
              plain
              circle
              @click="subAddition(collapse.prop)"
            />
            <el-button
              v-if="resumeForm[collapse.prop].length < 5"
              type="success"
              size="small"
              icon="el-icon-plus"
              plain
              circle
              @click="addAddition(collapse.prop)"
            />
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-form-item class="text-right mt-2">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEdit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  data() {
    return {
      activeNames: ['1'],
      collapseList: [
        {
          title: '求职期望',
          prop: 'anticipant',
          form: [
            {
              label: '期望职位',
              type: 'text',
              prop: 'job'
            },
            {
              label: '期望工资',
              type: 'input-number',
              prop: ['minSalary', 'maxSalary']
            },
            {
              label: '期望城市',
              type: 'text',
              prop: 'city'
            }
          ],
          withBtn: false
        },
        {
          title: '工作经历',
          prop: 'works',
          form: [
            {
              label: '公司名称',
              type: 'text',
              prop: 'companyName'
            },
            {
              label: '在职时间',
              type: 'date-range',
              prop: 'period'
            },
            {
              label: '工作内容',
              type: 'textarea',
              prop: 'content'
            }
          ],
          withBtn: true
        },
        {
          title: '项目经历',
          prop: 'projects',
          form: [
            {
              label: '项目名称',
              type: 'text',
              prop: 'name'
            },
            {
              label: '项目时间',
              type: 'date-range',
              prop: 'period'
            },
            {
              label: '项目描述',
              type: 'textarea',
              prop: 'description'
            }
          ],
          withBtn: true
        },
        {
          title: '教育背景',
          prop: 'schools',
          form: [
            {
              label: '学校名称',
              type: 'text',
              prop: 'name'
            },
            {
              label: '专业',
              type: 'text',
              prop: 'specialized_subject'
            },
            {
              label: '就读时间',
              type: 'date-range',
              prop: 'period'
            },
            {
              label: '在校经历',
              type: 'textarea',
              prop: 'school_experience'
            }
          ],
          withBtn: true
        },
        {
          title: '资格证书',
          prop: 'certificates',
          form: [
            {
              label: '证书名称',
              type: 'text',
              prop: 'name'
            }
          ],
          withBtn: true
        }
      ],
      resumeForm: {
        anticipant: [
          {
            job: '',
            city: '',
            minSalary: 1,
            maxSalary: 2
          }
        ],
        projects: [
          {
            name: '',
            period: [],
            description: ''
          }
        ],
        works: [
          {
            company_name: '',
            period: [],
            content: ''
          }
        ],
        schools: [
          {
            name: '',
            period: [],
            specialized_subject: '',
            school_experience: ''
          }
        ],
        certificates: [
          {
            name: ''
          }
        ]
      }
    }
  },

  watch: {
    resumeForm: {
      handler(newObj) {
        if (newObj.anticipant[0].maxSalary < newObj.anticipant[0].minSalary + 1) {
          newObj.anticipant[0].maxSalary = newObj.anticipant[0].minSalary + 1
        }
      },
      deep: true
    }
  },

  methods: {
    addAddition(prop) {
      let obj = cloneDeep(this.resumeForm[prop][0])
      for (let item in obj) {
        if (obj[item] instanceof Array) {
          obj[item] = []
        } else if (obj[item] instanceof Object) {
          obj[item] = {}
        } else {
          obj[item] = ''
        }
      }
      this.resumeForm[prop].push(obj)
    },

    subAddition(prop) {
      this.resumeForm[prop].pop()
    },

    handleClose() {
      this.$confirm('填写内容不会保存，确认关闭？', { type: 'warning' })
        .then(() => {
          this.$emit('close-dialog')
        })
        .catch(() => {})
    },

    closed() {
      this.$refs.resumeFormRef.resetFields()
    },

    handleEdit() {
      this.$confirm('确认修改？', { type: 'warning' })
        .then(() => {
          this.$message.success('修改成功！')
          console.log(this.resumeForm)
          this.$emit('close-dialog')
        })
        .catch(() => {})
    }
  },
  created() {}
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
        &-item {
          display: flex;

          &:not(:last-child) {
            margin-bottom: 30px;
          }
          .number {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            font-size: 12px;
            color: #fff;
            margin-top: 8px;
            margin-left: -20px;
            border-radius: 50%;
            background-color: #ebb563;
          }
          .form-item-wrapper {
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
