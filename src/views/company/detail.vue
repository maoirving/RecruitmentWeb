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
              v-for="(info, index) in infos"
              :key="index"
            >
              <h4 class="text-lg info-title">{{ info.title }}</h4>
              <div class="content-list">
                <div
                  class="content-list-item"
                  v-for="(item, i) in info.items"
                  :key="i"
                >
                  <h5 class="text-sm content-title" v-if="item.name">
                    {{ item.name }}：
                  </h5>
                  <p class="info-content" v-html="company[item.prop]"></p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col class="aside-wrapper" :span="7">
        <aside-wrapper class="aside-container" title="在招职位">
          <template slot="aside-content">
            <el-row
              v-if="company.Jobs && company.Jobs.length"
              class="flex-wrap content-list"
              type="flex"
              :gutter="20"
            >
              <el-col
                class="content-list-item"
                v-for="(job, index) in company.Jobs"
                :key="index"
              >
                <job-card :job="job" />
              </el-col>
            </el-row>
            <el-empty v-else description="该公司暂未发布职位" />
          </template>
        </aside-wrapper>
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/job/job-search'
import JobCard from '@/components/job/job-card'
import AsideWrapper from '@/components/aside/aside-wrapper'
import JobAside from '@/components/job/job-aside'
import CompanyCard from '@/components/company/company-card'
import moment from 'moment'

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
      infos: [
        {
          title: '基本信息',
          items: [
            {
              name: '融资阶段',
              prop: 'financingStage'
            },
            {
              name: '公司规模',
              prop: 'scale'
            },
            {
              name: '行业类别',
              prop: 'type'
            }
          ]
        },
        {
          title: '公司简介',
          items: [
            {
              prop: 'introduction'
            }
          ]
        },
        {
          title: '工商信息',
          items: [
            {
              name: '法定代表人',
              prop: 'legalRepresentative'
            },
            {
              name: '注册资本',
              prop: 'registeredCapital'
            },
            {
              name: '成立日期',
              prop: 'registeredAt'
            }
          ]
        },
        {
          title: '公司地址',
          items: [
            {
              prop: 'address'
            }
          ]
        }
      ],
      company: {}
    }
  },

  computed: {
    companyId() {
      return this.$route.query.companyId
    }
  },

  methods: {
    async getCompany() {
      const res = await this.$axios.get(`/companies/${this.companyId}`)
      const company = res.data.company
      const registeredAt = company.registeredAt
      company.registeredAt = moment(registeredAt)
        .utcOffset(0)
        .format('YYYY-MM-DD')
      this.company = company
    }
  },

  created() {
    this.getCompany()
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
