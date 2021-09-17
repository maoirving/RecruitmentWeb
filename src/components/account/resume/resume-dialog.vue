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
              <m-form class="resume-form" :form-items="collapse.formItems" :form-data="form">
                <div slot="salary">
                  <div>
                    <el-input-number v-model="form.minSalary" :step="1" :min="1"></el-input-number>
                    <span class="horizontal-line"> - </span>
                    <el-input-number
                      v-model="form.maxSalary"
                      :step="1"
                      :min="form.minSalary + 1"
                    ></el-input-number>
                    <span class="suffix">
                      K
                    </span>
                  </div>
                </div>
              </m-form>
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
    </el-form>
    <div slot="footer" class="text-right">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleEdit">修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import MForm from '@/components/module/m-form'
import { cloneDeep } from 'lodash'

export default {
  components: {
    MForm
  },

  data() {
    return {
      activeNames: ['1'],
      collapseList: [
        {
          title: '求职期望',
          prop: 'expectation',
          formItems: [
            {
              label: '期望职位',
              prop: 'job'
            },
            {
              label: '期望工资',
              slot: 'salary'
            },
            {
              label: '期望城市',
              prop: 'city'
            }
          ]
        },
        {
          title: '工作经历',
          prop: 'works',
          formItems: [
            {
              label: '公司名称',
              prop: 'companyName'
            },
            {
              label: '在职时间',
              prop: 'period',
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
              prop: 'content',
              control: {
                attrs: {
                  type: 'textarea',
                  rows: 6
                }
              }
            }
          ],
          withBtn: true
        },
        {
          title: '项目经历',
          prop: 'projects',
          formItems: [
            {
              label: '项目名称',
              prop: 'name'
            },
            {
              label: '项目时间',
              prop: 'period',
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
              label: '项目描述',
              prop: 'description',
              control: {
                attrs: {
                  type: 'textarea',
                  rows: 6
                }
              }
            }
          ],
          withBtn: true
        },
        {
          title: '教育背景',
          prop: 'schools',
          formItems: [
            {
              label: '学校名称',
              prop: 'name'
            },
            {
              label: '专业',
              prop: 'specialized_subject'
            },
            {
              label: '就读时间',
              prop: 'period',
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
              label: '在校经历',
              prop: 'school_experience',
              control: {
                attrs: {
                  type: 'textarea',
                  rows: 6
                }
              }
            }
          ],
          withBtn: true
        },
        {
          title: '资格证书',
          prop: 'certificates',
          formItems: [
            {
              label: '证书名称',
              prop: 'name'
            }
          ],
          withBtn: true
        }
      ],
      resumeForm: {
        expectation: [
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
        if (newObj.expectation[0].maxSalary < newObj.expectation[0].minSalary + 1) {
          newObj.expectation[0].maxSalary = newObj.expectation[0].minSalary + 1
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
          position: relative;
          display: flex;

          &:not(:last-child) {
            margin-bottom: 30px;
          }
          .number {
            position: absolute;
            top: 8px;
            left: -30px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
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
