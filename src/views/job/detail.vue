<template>
  <app-layout class="job-detail-page">
    <el-row class="content-wrapper" :gutter="15">
      <el-col class="main-content" :span="17">
        <el-card>
          <h2 class="text-2xl description-title main-title">
            {{ job.name }}
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
                  <p class="info-content" v-html="job[item.prop]"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-holder" v-if="job.status">
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
    <job-apply-dialog
      ref="applyDialogRef"
      :job-id="jobId"
      :visible.sync="dialogVisible"
      @close-dialog="dialogVisible = false"
    />
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import JobSearch from '@/components/job/job-search'
import JobCard from '@/components/job/job-card'
import AsideWrapper from '@/components/aside/aside-wrapper'
import CompanyCard from '@/components/company/company-card'
import JobApplyDialog from '@/components/job/job-apply-dialog'
import { getMatchedLabel, jobTypeOptions } from '@/utils/data-source'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppLayout,
    JobSearch,
    JobCard,
    AsideWrapper,
    CompanyCard,
    JobApplyDialog,
  },

  data() {
    return {
      infos: [
        {
          title: '基本信息',
          items: [
            {
              name: '工资范围',
              prop: 'salary',
            },
            {
              name: '招聘类型',
              prop: 'type',
            },

            {
              name: '工作经验',
              prop: 'workExperience',
            },
            {
              name: '学历要求',
              prop: 'educationBackground',
            },
            {
              name: '招聘人数',
              prop: 'recruitingNnumbers',
            },
            {
              name: '已申请人数',
              prop: 'appliedNnumbers',
            },
          ],
        },
        {
          title: '职位信息',
          items: [
            {
              name: '岗位职责',
              prop: 'description',
            },
            {
              name: '技能要求',
              prop: 'skill',
            },
            {
              name: '工作地址',
              prop: 'workLocation',
            },
          ],
        },
        {
          title: '联系方式',
          items: [
            {
              name: '公司地址',
              prop: 'companyAddress',
            },
          ],
        },
      ],
      job: {},
      dialogVisible: false,
    }
  },

  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    jobId() {
      let id = this.$route.query.jobId;
      return parseInt(id)
    },
  },

  methods: {
    async showDialog() {
      if (!this.isAuthenticated) {
        return this.$message.info('请先登录！')
      }
      const res = await this.$axios.get('/applications', {
        params: {
          jobId: this.jobId,
        },
      })
      const count = res.data.pagination && res.data.pagination.total
      if (count > 0) {
        this.$message.info('您已申请过该职位，请勿重复申请')
      } else {
        this.$refs.applyDialogRef.dialogVisible = true
      }
    },
    async getJob() {
      const { data } = await this.$axios.get(`/jobs/${this.jobId}`)
      this.job = data.job
      this.job.type = getMatchedLabel(jobTypeOptions, data.job.type)
      this.job.recruitingNnumbers = `${data.job.recruitingNnumbers}人`
      this.job.appliedNnumbers = `${data.job.Applications.length}人`
      this.job.companyAddress = data.job?.Company?.address
    },
  },

  mounted() {
    this.getJob()
  },
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
