<template>
  <div class="resume-wrapper">
    <div class="header-holder">
      <h4>
        在线简历
      </h4>
      <div class="btn-holder">
        <a class="text-btn" href="javascript:;"><i class="el-icon-edit icon"></i>编辑简历</a>
      </div>
    </div>
    <div class="info-list">
      <div class="info-list-item">
        <h4 class="info-title">基本信息</h4>
        <p class="info-content">
          <span> {{ resume.trueName }}</span>
          <el-divider direction="vertical" />
          <span> {{ resume.age }}岁</span>
          <el-divider direction="vertical" />
          <span> {{ resume.eduction }}</span>
        </p>
      </div>
      <div class="info-list-item">
        <h4 class="info-title">求职期望</h4>
        <p class="info-content">
          <span> {{ resume.anticipant_job }}</span>
          <el-divider direction="vertical" />
          <span> {{ resume.anticipant_city }}</span>
          <el-divider direction="vertical" />
          <span> {{ resume.anticipant_salary }}</span>
        </p>
      </div>
      <div class="info-list-item">
        <h4 class="info-title">工作经历</h4>
        <div class="info-content">
          <ul class="unstyle-list">
            <li class="mb-3" v-for="(work, index) in resume.works" :key="index">
              <p><strong>公司名称：</strong>{{ work.company_name }}</p>
              <p><strong>在职时间：</strong>{{ work.period }}</p>
              <p><strong>工作内容：</strong>{{ work.content }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="info-list-item">
        <h4 class="info-title">项目经历</h4>
        <div class="info-content">
          <ul class="unstyle-list">
            <li class="mb-3" v-for="(project, index) in resume.projects" :key="index">
              <p><strong>项目名称：</strong>{{ project.name }}</p>
              <p><strong>项目时间：</strong>{{ project.period }}</p>
              <p><strong>项目描述：</strong>{{ project.description }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="info-list-item">
        <h4 class="info-title">教育经历</h4>
        <div class="info-content">
          <ul class="unstyle-list">
            <li class="mb-3" v-for="(school, index) in resume.schools" :key="index">
              <p><strong>学校名称：</strong>{{ school.name }}</p>
              <p><strong>就读时间：</strong>{{ school.specialized_subject }}</p>
              <p><strong>在校经历：</strong>{{ school.school_experience }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="info-list-item">
        <h4 class="info-title">资格证书</h4>
        <div class="info-content">
          <ul class="certificate-list">
            <li
              class="mb-1 certificate-list-item"
              v-for="(certificate, index) in resume.certificates"
              :key="index"
            >
              {{ certificate.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-holder">
      <h4>
        附件简历
      </h4>
      <div class="btn-holder">
        <a class="text-btn" href="javascript:;"><i class="el-icon-upload2 icon"></i>上传简历</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resume: {
        trueName: '洪铭娟',
        age: '21',
        eduction: '本科',
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
            description: '这是一个很厉害的项目'
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
            specialized_subject: '计算机科学与技术',
            school_experience: '这是在校经历'
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
  }
}
</script>

<style lang="scss" scoped>
.resume-wrapper {
  .header-holder {
    display: flex;
    align-items: flex-end;
    padding-bottom: $gap;
    margin-bottom: $gap-lg;
    .content-title {
    }
    .btn-holder {
      margin-left: auto;
      .text-btn {
        color: $c-green-600;

        &:not(:last-child) {
          margin-right: $gap-lg;
        }
        .icon {
          margin-right: $gap-xs;
        }
      }
    }
  }
  .info-list {
    &-item {
      padding-top: $gap;
      padding-bottom: $gap-lg;
      border-bottom: $solid-gray;
      .info-title {
        font-size: 1.25rem;
        font-weight: 400;
        color: $c-green-600;
        padding-left: $gap-sm;
        margin-bottom: $gap;
        border-left: 3px solid $c-green-600;
      }
      .info-content {
      }
      .certificate-list {
        list-style-type: circle;
        &-item {
        }
      }
    }
  }
}
</style>
