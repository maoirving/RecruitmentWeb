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
    <el-form ref="resumeForm" :model="resumeForm" label-width="80px">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in experienceList"
          :key="index"
          :title="item.title"
          :name="index + 1"
        >
          <ul class="experience-list">
            <li
              class="experience-list-item"
              v-for="(experience, i) in resumeForm[item.prop]"
              :key="i"
            >
              <el-form-item v-for="(formItem, k) in item.form" :key="k" :label="formItem.label">
                <el-input
                  v-if="formItem.type === 'text' || formItem.type === 'textarea'"
                  :type="formItem.type"
                  :rows="formItem.type === 'textarea' ? 6 : undefined"
                  v-model="experience[formItem.prop]"
                  :placeholder="`请输入${formItem.label}`"
                >
                </el-input>
                <div v-if="formItem.type === 'input-number'">
                  <el-input-number
                    v-model="experience[formItem.prop[0]]"
                    :step="1"
                    :min="1"
                  ></el-input-number>
                  <span>
                    K
                  </span>
                  <span> --- </span>
                  <el-input-number
                    v-model="experience[formItem.prop[1]]"
                    :step="1"
                    :min="experience[formItem.prop[0]] + 1"
                  ></el-input-number>
                  <span>
                    K
                  </span>
                </div>
                <el-date-picker
                  v-if="formItem.type === 'date-range'"
                  v-model="experience[formItem.prop]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </li>
          </ul>
          <div v-if="item.withBtn" class="btn-holder text-right">
            <el-button
              v-if="resumeForm[item.prop].length > 1"
              type="danger"
              size="small"
              icon="el-icon-minus"
              plain
              circle
              @click="subAddition(item.prop)"
            />
            <el-button
              v-if="resumeForm[item.prop].length < 5"
              type="success"
              size="small"
              icon="el-icon-plus"
              plain
              circle
              @click="addAddition(item.prop)"
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
      experienceList: [
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
              label: '期望城市',
              type: 'text',
              prop: 'city'
            },
            {
              label: '期望工资',
              type: 'input-number',
              prop: ['minSalary', 'maxSalary']
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
            name: '厉害的项目',
            period: [],
            description: '这是一个很厉害的项目'
          },
          {
            name: '厉害的项目',
            period: [],
            description:
              '这是一个很厉害的项目，这是一个很厉害的项目，这是一个很厉害的项目，这是一个很厉害的项目，这是一个很厉害的项目'
          }
        ],
        works: [
          {
            company_name: '厉害公司',
            period: [],
            content: '这是很厉害的工作'
          },
          {
            company_name: '厉害公司2',
            period: [],
            content: '这是很厉害的工作'
          }
        ],
        schools: [
          {
            name: '闽南师范大学',
            period: [],
            specialized_subject: '计算机科学与技术',
            school_experience:
              '这是在校经历，这是在校经历，这是在校经历，这是在校经历，这是在校经历，这是在校经历，这是在校经历'
          }
        ],
        certificates: [
          {
            name: '英语四级证书'
          },
          {
            name: '英语六级证书'
          }
        ]
      }
    }
  },

  watch: {
    resumeForm: {
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
      this.$refs.resumeForm.resetFields()
    },
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
    handleEdit() {
      this.$refs.resumeForm.validate(async valid => {
        if (!valid) return
        this.$confirm('确认修改？', { type: 'warning' })
          .then(() => {
            this.$message.success('修改成功！')
            console.log(this.resumeForm)
            this.$emit('close-dialog')
          })
          .catch(() => {})
      })
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.resume-dialog {
  padding: $gap;
  overflow: auto;
  .el-collapse {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 30px;
    &-item {
    }
  }
  .experience-list {
    &-item {
      padding-top: 0;
    }
  }
  .btn-holder {
  }
}
</style>
