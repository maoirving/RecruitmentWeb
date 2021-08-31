<template>
  <app-layout>
    <el-row class="job-detail-wrapper" :gutter="15">
      <el-col :span="17">
        <el-card>
          <h2 class="primary-title description-title">
            Web前端开发工程师
          </h2>
          <div class="info-list">
            <div class="info-list-item" v-for="(info, index) in infos" :key="index">
              <h4 class="plain-title content-title info-title">{{ info.title }}</h4>
              <div class="content-list">
                <div class="content-list-item" v-for="(item, i) in info.children" :key="i">
                  <h5 class="small-title" v-if="item.name">{{ item.name }}：</h5>
                  <p class="info-content" v-html="item.content"></p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="aside-holder">
          <h4 class="plain-title aside-title">
            公司基本信息
          </h4>
          <div class="text-holder">
            <h5 class="small-title">{{ company.name }}</h5>
            <p class="info-content">{{ company.category }}</p>
            <p class="info-content">{{ company.financingStage }}</p>
            <p class="info-content">{{ company.staffCount }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/search/job-search'
import JobList from '@/components/job/job-list'
import JobCard from '@/components/job/job-card'
import JobAside from '@/components/job/job-aside'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobList,
    JobCard,
    JobAside
  },
  data() {
    return {
      infos: [
        {
          title: '职位信息',
          children: [
            {
              name: '岗位职责',
              content:
                '1、负责前端架构设计和实现；<br>2、参与相关产品工程优化、组件设计和开发工作；<br>3、研发通用功能的SDK和基础组件，提升代码复用率，提高技术团队的开发效率和质量；<br>4、引入前端新技术，并推动新技术落地；'
            },
            {
              name: '技能要求',
              content:
                '1、掌握前端工程化与模块化开发、架构设计；<br>2、对代码和设计质量有严格要求，良好的编码风格，有代码洁癖；具有较高的技术钻研能力、技术难点攻关能力，分析问题解决问题的能力；<br>3、掌握webpack构建工具配置和使用、熟悉npm依赖管理；<br>4、能独立完成复杂的自定义控件，如：日期、课表、瀑布流等，掌握各种动画实现方式；'
            }
          ]
        },
        {
          title: '联系方式',
          children: [
            {
              name: '公司地址',
              content: '厦门市湖滨东路11号邮电广通大厦22楼及同安、集美、海沧、翔安办事处'
            },
            {
              name: '电话',
              content: '565656565'
            }
          ]
        },
        {
          title: '公司信息',
          children: [
            {
              content:
                '银联商务有限公司是中国银联控股的，专门从事银行卡受理市场建设和提供综合支付服务的机构，成立于2002年12月。银联商务是首批获得人民银行《支付业务许可证》的支付机构，也是人民银行确定的21家重点支付机构之一。'
            }
          ]
        }
      ],
      company: {
        name: '字节跳动科技有限公司',
        category: '互联网',
        financingStage: '已上市',
        staffCount: '1000人以上'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.job-detail-wrapper {
  $gap: 15px;
  $c-primary: #0aa7a7 !default;

  margin-top: $gap;
  margin-bottom: $gap;
  .info-list {
    &-item {
      margin-bottom: $gap;
      border-bottom: 1px solid #e8e8e8;
      .info-title {
        padding-left: $gap;
        border-left: 4px solid $c-primary;
      }
      .content-list {
        &-item {
          .info-content {
            line-height: 2;
          }
        }
      }
    }
  }
  .aside-holder {
    .aside-title {
      padding-bottom: $gap;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
