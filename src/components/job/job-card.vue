<template>
  <div class="job-card" @click="toJobDetail">
    <div class="job-card-content">
      <div class="title-holder">
        <h4 class="font-normal text-base text-green-600">
          {{ job.name }}
        </h4>
        <div class="content-tag">{{ job.salary }}</div>
      </div>

      <p v-if="!isSimpleType" class="content-text">
        <span class="text-xs">{{ description }}</span>
      </p>
    </div>
    <div class="job-card-footer">
      <el-row type="flex" align="center" :gutter="10">
        <el-col :span="4">
          <base-aspect data-ratio="1:1" isCircle with-shadow>
            <div class="image-holder" @click.stop="toCompanyDetail">
              <img :src="job.imageUrl" alt="" />
            </div>
          </base-aspect>
        </el-col>
        <el-col class="flex items-center" :span="20">
          <div class="text-holder" @click.stop="toCompanyDetail">
            <span class="footer-info">
              {{ job.company.name }}
            </span>
            <span v-if="!isSimpleType" class="footer-info">
              {{ job.company.financingStage }}
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BaseAspect from '@/components/base/base-aspect'

export default {
  components: {
    BaseAspect
  },
  props: {
    isSimpleType: {
      type: Boolean,
      default: false
    },

    job: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    description() {
      return `${this.job.city} ｜ ${this.job.experience} ｜ ${this.job.education}`
    }
  },

  methods: {
    toJobDetail() {
      this.$router.push(`/job/detail?jobId=${this.job.id}`)
    },

    toCompanyDetail() {
      this.$router.push(`/company/detail?companyId=${this.job.company.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.job-card {
  padding: 18px 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.3);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
  &-content {
    .title-holder {
      display: flex;

      justify-content: space-between;
      align-items: center;
      .content-title {
      }
      .content-tag {
        color: rgb(240, 54, 54);
      }
    }
  }
}
</style>
