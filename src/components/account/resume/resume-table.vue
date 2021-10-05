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
        <ol v-if="description.type === 'item'" class="experience-list">
          <li
            class="experience-list-item"
            v-for="(work, index) in resume[description.prop]"
            :key="index"
          >
            <p v-for="(item, i) in description.children" :key="i">
              <strong>{{ item.label }}：</strong>{{ work[item.prop] }}
            </p>
          </li>
        </ol>
        <ul v-if="description.type === 'list'" class="certificate-list">
          <li
            class="certificate-list-item"
            v-for="(item, index) in resume[description.prop]"
            :key="index"
          >
            {{ item[description.children[0].prop] }}
          </li>
        </ul>
      </el-descriptions-item>
    </el-descriptions>
    <resume-dialog :visible.sync="dialogVisible" @close-dialog="dialogVisible = false" />
  </div>
</template>

<script>
import ResumeDialog from '@/components/account/resume/resume-dialog'

export default {
  components: {
    ResumeDialog
  },

  props: {
    resume: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      dialogVisible: false,
      descriptions: [
        {
          icon: 'el-icon-user',
          label: '姓名',
          type: 'text',
          prop: 'trueName'
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
          prop: 'eduction'
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
          prop: 'currentAdress'
        },
        {
          icon: 'el-icon-suitcase-1',
          label: '求职期望',
          type: 'textGroup',
          children: [
            {
              label: '期望职位',
              prop: 'anticipant_job'
            },
            {
              label: '期望城市',
              prop: 'anticipant_city'
            },
            {
              label: '期望工资',
              prop: 'anticipant_salary'
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
          label: '工作经历',
          type: 'item',
          prop: 'works',
          span: 3,
          children: [
            {
              label: '公司名称',
              prop: 'company_name'
            },
            {
              label: '在职时间',
              prop: 'period'
            },
            {
              label: '工作内容',
              prop: 'content'
            }
          ]
        },
        {
          icon: 'el-icon-notebook-2',
          label: '项目经历',
          type: 'item',
          prop: 'projects',
          span: 3,
          children: [
            {
              label: '项目名称',
              prop: 'name'
            },
            {
              label: '项目时间',
              prop: 'period'
            },
            {
              label: '项目描述',
              prop: 'description'
            }
          ]
        },
        {
          icon: 'el-icon-notebook-2',
          label: '教育经历',
          type: 'item',
          prop: 'schools',
          span: 3,
          children: [
            {
              label: '学校名称',
              prop: 'name'
            },
            {
              label: '就读时间',
              prop: 'period'
            },
            {
              label: '专业',
              prop: 'specialized_subject'
            },
            {
              label: '在校经历',
              prop: 'school_experience'
            }
          ]
        },
        {
          icon: 'el-icon-trophy',
          label: '资格证书',
          type: 'list',
          prop: 'certificates',
          span: 3,
          children: [
            {
              prop: 'name'
            }
          ]
        }
      ]
    }
  },

  methods: {
    showDialog() {
      this.dialogVisible = true
    }
  },

  mounted() {
    const arr = ['hello', 'mao']
    const str = 'hello;mao'
    console.log(str.split(';'))
    console.log(arr.join(';'))
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
