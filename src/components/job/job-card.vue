<template>
  <div class="job-card" @click="toJobDetail">
    <div class="job-card-header">
      <h4 class="text-base truncate header-title">
        {{ job.name }}
      </h4>
      <div class="header-tag">{{ job.salary }}</div>
    </div>
    <div class="job-card-body">
      <p v-if="!isSimpleType" class="body-content">
        <span class="text-xs">{{ job.city }}</span>
        <i class="v-line"></i>
        <span class="text-xs">{{ job.experience }}</span>
        <i class="v-line"></i>
        <span class="text-xs">{{ job.education }}</span>
      </p>
    </div>
    <div class="job-card-footer">
      <el-row type="flex" align="center" :gutter="10">
        <el-col :span="4">
          <base-aspect data-ratio="1:1" isCircle with-shadow>
            <div class="image-holder" @click.stop="toCompanyDetail">
              <img :src="job.company.imageUrl" />
            </div>
          </base-aspect>
        </el-col>
        <el-col class="flex items-center" :span="20">
          <div class="truncate text-holder" @click.stop="toCompanyDetail">
            <span class="truncate text-gray-600 footer-text main-text">
              {{ job.company.name }}
            </span>
            <i class="v-line"></i>
            <span class="truncate footer-text short-text">
              {{ job.company.category }}
            </span>
            <i class="v-line"></i>
            <span v-if="!isSimpleType" class="truncate footer-text short-text">
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
  padding: $gap-sm $gap;
  background-color: $c-white;
  border-radius: $gap-xs;
  cursor: pointer;
  border: $border-gray;
  transition: $transition;
  &:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    .header-title {
      max-width: 80%;
      font-weight: 400;
      color: $c-green-600;
      margin-bottom: 0;
    }
    .header-tag {
      color: $c-red-400;
    }
  }
  &-body {
    margin-bottom: 8px;

    .body-content {
      margin-bottom: 0;
    }
  }
  &-footer {
    .image-holder {
      height: 100%;
    }
    .text-holder {
      display: flex;
      align-items: center;
      .footer-text {
        display: inline-block;
        font-size: 13px;
        &.main-text {
          max-width: 90px;
        }
        &.short-text {
          max-width: 50px;
        }
      }
    }
  }
}
</style>
