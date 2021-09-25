<template>
  <app-layout class="job-detail-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col class="main-content" :span="17">
        <el-card>
          <h2 class="text-2xl description-title main-title">
            {{ job.name }}
          </h2>
          <div class="info-list">
            <div class="info-list-item" v-for="(info, index) in infos" :key="index">
              <h4 class="text-lg info-title">{{ info.title }}</h4>
              <div class="content-list">
                <div class="content-list-item" v-for="(item, i) in info.items" :key="i">
                  <h5 class="text-sm content-title" v-if="item.name">{{ item.name }}：</h5>
                  <p class="info-content" v-html="job[item.prop]"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-holder">
            <el-button type="primary" size="small" round @click="showDialog">
              立即申请
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col class="aside-wrapper" :span="7">
        <aside-wrapper class="aside-container" title="公司基本信息">
          <template slot="aside-content">
            <company-card v-if="job.Company" :company="job.Company" />
          </template>
        </aside-wrapper>
      </el-col>
    </el-row>
    <div class="dialog-wrapper">
      <job-apply-dialog :visible.sync="dialogVisible" @close-dialog="dialogVisible = false" />
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/search/job-search'
import JobCard from '@/components/job/job-card'
import AsideWrapper from '@/components/aside/aside-wrapper'
import CompanyCard from '@/components/company/company-card'
import JobApplyDialog from '@/components/job/job-apply-dialog'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobCard,
    AsideWrapper,
    CompanyCard,
    JobApplyDialog
  },
  data() {
    return {
      infos: [
        {
          title: '职位信息',
          items: [
            {
              name: '岗位职责',
              prop: 'description'
            },
            {
              name: '技能要求',
              prop: 'skill'
            },
            {
              name: '工作地址',
              prop: 'workLocation'
            }
          ]
        },
        {
          title: '联系方式',
          items: [
            {
              name: '公司地址',
              prop: 'address'
            },
            {
              name: '电话',
              prop: 'phoneNumber'
            }
          ]
        }
      ],
      job: {},
      dialogVisible: false
    }
  },

  computed: {
    jobId() {
      return this.$route.query.jobId
    }
  },

  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    async getJob() {
      const res = await this.$axios.get(`/jobs/${this.jobId}`)
      this.job = res.data.job
    }
  },

  mounted() {
    this.getJob()
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
      .btn-holder {
        text-align: center;
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
