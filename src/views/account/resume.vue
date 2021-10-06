<template>
  <div class="resume-wrapper">
    <el-collapse class="resume-collapse" v-model="activeNames">
      <el-collapse-item title="在线简历" name="1">
        <resume-table :resume="resume" />
      </el-collapse-item>
      <el-collapse-item title="附件简历" name="2">
        <file-list :files="files" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import ResumeTable from '@/components/account/resume/resume-table'
import FileList from '@/components/account/resume/file-list'
import { pick, omit, omitBy, cloneDeep } from 'lodash'
import { mapState } from 'vuex'

export default {
  components: {
    ResumeTable,
    FileList
  },

  data() {
    return {
      activeNames: ['1'],
      resume: {
        trueName: '洪铭娟',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        sex: '女',
        age: '21',
        eduction: '本科',
        phoneNumber: '18352728292',
        email: 'eje@dk.com',
        currentAdress: '福建厦门',
        anticipant_job: 'Ui设计师',
        anticipant_city: '厦门',
        anticipant_salary: '7-12k',
        projects: [
          {
            name: '厉害的项目',
            period: '2021.02-2021.09',
            description: '这是一个很厉害的项目'
          },
          {
            name: '厉害的项目',
            period: '2021.02-2021.09',
            description:
              '这是一个很厉害的项目，这是一个很厉害的项目，这是一个很厉害的项目，这是一个很厉害的项目，这是一个很厉害的项目'
          }
        ],
        works: [
          {
            company_name: '厉害公司',
            period: '2021.02-2021.09',
            content: '这是很厉害的工作'
          },
          {
            company_name: '厉害公司2',
            period: '2021.02-2021.09',
            content: '这是很厉害的工作'
          }
        ],
        schools: [
          {
            name: '闽南师范大学',
            period: '2018.09 - 2022.06',
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
      },
      files: [
        {
          id: '1',
          name: 'web前端开发工程师.pdf',
          url: 'hjkjdfkjdkf'
        },
        {
          id: '2',
          name: 'UI设计师.pdf',
          url: 'hjkjdfkjdkf'
        }
      ]
    }
  },

  computed: {
    ...mapState('user', {
      userId: state => state.id
    })
  },

  methods: {
    async getResume() {
      const res = await this.$axios.get('/resumes', {
        params: {
          userId: this.userId
        }
      })
      const resume = omit(res.data.resumeFiles[0], ['User'])
    }
  },

  mounted() {
    this.getResume()
  }
}
</script>

<style lang="scss" scoped>
.resume-wrapper {
  .resume-collapse {
    ::v-deep .el-collapse-item__header {
      font-size: 14px;
    }
    ::v-deep .el-collapse-item__content {
      padding-top: 10px;
    }
  }
}
</style>
