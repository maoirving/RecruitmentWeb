<template>
  <app-layout class="job-detail-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col class="main-content" :span="17">
        <el-card>
          <h2 class="text-2xl description-title main-title">
            {{ company.name }}
          </h2>
          <div class="info-list">
            <div
              class="info-list-item"
              v-for="(info, index) in company.infos"
              :key="index"
            >
              <h4 class="text-lg info-title">{{ info.title }}</h4>
              <div class="content-list">
                <div
                  class="content-list-item"
                  v-for="(item, i) in info.children"
                  :key="i"
                >
                  <h5 class="text-sm content-title" v-if="item.name">
                    {{ item.name }}：
                  </h5>
                  <p class="info-content" v-html="item.content"></p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col class="aside-wrapper" :span="7">
        <aside-wrapper class="aside-container" title="在招职位">
          <el-row
            slot="aside-content"
            class="flex-wrap content-list"
            type="flex"
            :gutter="20"
          >
            <el-col
              class="content-list-item"
              v-for="(job, index) in jobs"
              :key="index"
            >
              <job-card is-simple-type :job="job" />
            </el-col>
          </el-row>
        </aside-wrapper>
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/search/job-search'
import JobCard from '@/components/job/job-card'
import AsideWrapper from '@/components/aside/aside-wrapper'
import JobAside from '@/components/job/job-aside'
import CompanyCard from '@/components/company/company-card'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobCard,
    AsideWrapper,
    CompanyCard,
    JobAside
  },
  data() {
    return {
      company: {
        name: '字节跳动科技有限公司',
        infos: [
          {
            title: '基本信息',
            children: [
              {
                name: '融资阶段',
                content: '已上市'
              },
              {
                name: '公司规模',
                content: '1000-9999人'
              },
              {
                name: '行业类别',
                content: '互联网'
              }
            ]
          },
          {
            title: '公司简介',
            children: [
              {
                content: `美图公司成立于2008年10月，以“让更多人变美”为使命，怀揣着“成为全球懂美的科技公司”的愿景，创造了一系列软硬件产品，如美图秀秀、BeautyCam美颜相机、短视频社区美拍以及美图拍照手机，改变了用户创造与分享美的方式，也使自拍文化深入人心。
美图总部坐落于厦门，此外，在北京、上海、杭州、广州、深圳、香港设立了分公司和办事处。同时，在海外的美国、巴西、印度、英国、日本、韩国、新加坡、印度尼西亚等国家设立了分公司和办事处，并推出了本地化应用和服务。
2016年12月15日，美图公司在香港联合交易所（“联交所”）主板挂牌上市，股票代码1357。`
              }
            ]
          },
          {
            title: '工商信息',
            children: [
              {
                name: '法定代表人',
                content: '陈翠娥'
              },
              {
                name: '注册资本',
                content: '1000万人民币'
              },
              {
                name: '成立日期',
                content: '2016-07-27'
              }
            ]
          },
          {
            title: '公司地址',
            children: [
              {
                content: '厦门思明区厦门市软件园望海路8号楼1楼'
              }
            ]
          }
        ]
      },
      jobs: []
    }
  },

  methods: {
    getJobs() {
      const job = {
        name: '高级前端开发工程师',
        salary: '12-20k',
        city: '厦门',
        experience: '经验不限',
        education: '本科',
        company: {
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/logo/20210525/77d60eae41e48b90df64951371a7a07a19f97e2c258c6cead07beaf11928d91b.png?x-oss-process=image/resize,w_120,limit_0',
          category: '计算机',
          financingStage: '已上市'
        }
      }
      for (let i = 0; i < 20; i++) {
        this.jobs.push(job)
      }
    }
  },

  created() {
    this.getJobs()
  }
}
</script>

<style lang="scss" scoped>
.job-detail-page {
  position: relative;
  .content-wrapper {
    .main-content {
      .main-title {
        margin-bottom: $gap-lg;
      }
      .info-list {
        &-item {
          margin-bottom: $gap-lg;
          &:not(:last-child) {
            border-bottom: 1px solid #e8e8e8;
          }
          .info-title {
            padding-left: $gap;
            border-left: 4px solid $c-green-600;
            margin-bottom: $gap-sm;
          }
          .content-list {
            &-item {
              margin-bottom: $gap;
              .content-title {
                margin-bottom: $gap-xs;
              }
              .info-content {
                line-height: 2;
              }
            }
          }
        }
      }
    }
    .aside-wrapper {
      position: sticky;
      top: 0;
      .aside-holder {
        .aside-title {
          padding-bottom: $gap;
          margin-bottom: $gap-lg;
          border-bottom: 1px solid #e8e8e8;
        }
      }
    }
  }
}
</style>
