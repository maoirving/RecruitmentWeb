<template>
  <div>
    <el-descriptions
      class="description-wrapper"
      :column="3"
      contentClassName="description-content"
      :labelStyle="{ 'text-align': 'center' }"
      :contentStyle="{ 'text-align': 'center' }"
      border
    >
      <template slot="extra">
        <el-button size="small" round @click="showDialog">编辑</el-button>
      </template>
      <el-descriptions-item
        v-for="(description, index) in descriptions"
        :key="index"
        :span="description.span ? description.span : 1"
      >
        <template slot="label">
          <i :class="description.icon"></i>
          {{ description.label }}
        </template>
        <span v-if="description.type === 'text'">
          {{ resume[description.prop] }}
        </span>
        <div class="text-group" v-if="description.type === 'textGroup'">
          <p v-for="(item, i) in description.children" :key="i">
            <label>{{ item.label }}：</label>{{ resume[item.prop] }}
          </p>
        </div>
        <el-avatar v-if="description.type === 'image'" :size="100" :src="resume.imageUrl" />
        <ul v-if="description.type === 'item'" class="experience-list">
          <li class="experience-list-item">
            <div class="flex" v-for="(item, i) in description.children" :key="i">
              <strong>{{ item.label }}：</strong>
              <p v-if="item.isPeriod">{{ resume[item.prop] | parsePeriod }}</p>
              <p v-else v-html="resume[item.prop]"></p>
            </div>
          </li>
        </ul>
        <ul v-if="description.type === 'list'" class="certificate-list">
          <li
            class="certificate-list-item"
            v-for="(certificate, index) in resume.certificates"
            :key="index"
          >
            {{ certificate }}
          </li>
        </ul>
      </el-descriptions-item>
    </el-descriptions>
    <resume-edit-dialog ref="editDialogRef" />
  </div>
</template>

<script>
import ResumeEditDialog from '@/components/account/resume/resume-edit-dialog'
import { omit } from 'lodash'
import { strToArr, parseToPeriodRange } from '@/utils/parsers'

export default {
  components: {
    ResumeEditDialog
  },

  data() {
    return {
      resume: {},
      descriptions: [
        {
          icon: 'el-icon-user',
          label: '姓名',
          type: 'text',
          prop: 'realName'
        },
        {
          icon: 'el-icon-guide',
          label: '性别',
          type: 'text',
          prop: 'sex'
        },
        {
          icon: 'el-icon-lollipop',
          label: '年龄',
          type: 'text',
          prop: 'age',
          suffix: '岁'
        },
        {
          icon: 'el-icon-school',
          label: '学历',
          type: 'text',
          prop: 'educationBackground'
        },
        {
          icon: 'el-icon-mobile-phone',
          label: '手机号码',
          type: 'text',
          prop: 'phoneNumber'
        },
        {
          icon: 'el-icon-message',
          label: '电子邮箱',
          type: 'text',
          prop: 'email'
        },
        {
          icon: 'el-icon-office-building',
          label: '当前住址',
          type: 'text',
          prop: 'currentAddress'
        },
        {
          icon: 'el-icon-suitcase-1',
          label: '求职期望',
          type: 'textGroup',
          children: [
            {
              label: '期望职位',
              prop: 'anticipantJob'
            },
            {
              label: '期望城市',
              prop: 'anticipantCity'
            },
            {
              label: '期望工资',
              prop: 'anticipantSalary'
            }
          ]
        },
        {
          icon: 'el-icon-picture-outline-round',
          label: '照片',
          type: 'image',
          prop: 'imageUrl'
        },
        {
          icon: 'el-icon-notebook-2',
          label: '教育经历',
          type: 'item',
          span: 3,
          children: [
            {
              label: '学校名称',
              prop: 'school'
            },
            {
              label: '就读时间',
              prop: 'schoolPeriod',
              isPeriod: true
            },
            {
              label: '专业',
              prop: 'specializedSubject'
            }
          ]
        },
        {
          icon: 'el-icon-notebook-2',
          label: '工作经历',
          type: 'item',
          span: 3,
          children: [
            {
              label: '公司名称',
              prop: 'workCompany'
            },
            {
              label: '在职时间',
              prop: 'workPeriod',
              isPeriod: true
            },
            {
              label: '工作内容',
              prop: 'workContent'
            }
          ]
        },
        {
          icon: 'el-icon-trophy',
          label: '资格证书',
          type: 'list',
          prop: 'certificates',
          span: 3
        }
      ]
    }
  },

  filters: {
    parsePeriod(arr) {
      return arr && arr.length ? parseToPeriodRange(arr) : ''
    }
  },

  methods: {
    showDialog() {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.outerThis = this
      this.$refs.editDialogRef.outerData = this.resume
    },
    async getResume() {
      const res = await this.$axios.get('/resumes')
      const resume = res.data.resumes[0]
      const newResume = Object.assign(omit(resume, ['User']), resume.User)
      newResume.age = new Date().getFullYear() - new Date(newResume.birthday).getFullYear() + '岁'
      newResume.certificates = strToArr(newResume.certificates)
      newResume.schoolPeriod = strToArr(newResume.schoolPeriod)
      newResume.workPeriod = strToArr(newResume.workPeriod)
      this.resume = newResume
    },
    reload() {
      this.getResume()
    }
  },

  mounted() {
    this.getResume()
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions-item__label {
  &.is-bordered-label {
    font-weight: 400;
  }
}
::v-deep .description-content {
  &[colspan='1'] {
    max-width: 140px;
  }
  &[colspan='5'] {
    max-width: 240px;
    text-align: left !important;
  }
}
.description-wrapper {
  .text-group {
    text-align: left;
  }
  .experience-list {
    margin-top: 0;
    margin-bottom: 0;
    &-item {
      &:not(:last-child) {
        margin-bottom: $gap;
      }
    }
  }
  .certificate-list {
    list-style-type: circle;
    &-item {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
