<template>
  <div class="job-card" @click="toJobDetail">
    <div class="job-card-header">
      <h4 class="text-base truncate header-title" :class="{ 'text-green-600': !isSimpleType }">
        {{ job.name }}
      </h4>
      <div class="header-tag">{{ job.salary }}</div>
    </div>
    <div class="job-card-body">
      <p v-if="!isSimpleType" class="body-content">
        <span class="text-xs">{{ job.city }}</span>
        <el-divider direction="vertical" />
        <span class="text-xs">{{ job.experience }}</span>
        <el-divider direction="vertical" />
        <span class="text-xs">{{ job.education }}</span>
      </p>
    </div>
    <div class="job-card-footer">
      <el-row type="flex" align="middle" :gutter="10">
        <el-col :span="4">
          <base-aspect data-ratio="1:1" is-circle with-shadow>
            <div class="image-holder" @click.stop="toCompanyDetail">
              <img :src="job.company.imageUrl" />
            </div>
          </base-aspect>
        </el-col>
        <el-col class="flex items-center" :span="20">
          <div class="truncate text-holder" @click.stop="toCompanyDetail">
            <span
              class="truncate text-gray-600 footer-text main-text"
              :class="{ 'max-w-full': isSimpleType }"
            >
              {{ job.company.name }}
            </span>
            <template v-if="!isSimpleType">
              <el-divider direction="vertical" />
              <span class="truncate footer-text short-text">
                {{ job.company.category }}
              </span>
              <el-divider direction="vertical" />
              <span class="truncate footer-text short-text">
                {{ job.company.financingStage }}
              </span>
            </template>
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
  border-radius: 8px;
  cursor: pointer;
  border: $solid-gray;
  transition: $transition;
  &:hover {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
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
    }
    .header-tag {
      color: $c-red-400;
    }
  }
  &-body {
    margin-bottom: 8px;
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
          max-width: 126px;
        }
        &.short-text {
          max-width: 50px;
        }
      }
    }
  }
}
</style>
