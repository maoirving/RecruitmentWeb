<template>
  <div class="company-card">
    <router-link class="link" :to="`company/detail/${company.id}`">
      <div class="company-card-header">
        <el-row type="flex" align="middle" :gutter="20">
          <el-col :span="8">
            <base-aspect data-ratio="1:1" is-rounded-rectangle with-shadow>
              <div class="image-holder">
                <img :src="company.imageUrl" alt="" />
              </div>
            </base-aspect>
          </el-col>
          <el-col :span="16">
            <div class="text-holder">
              <h4 class="text-sm font-normal header-title">
                {{ company.name }}
              </h4>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="company-card-body">
        <span class="truncate content-text">
          {{ company.financingStage }}
        </span>
        <i class="v-line"></i>
        <span class="truncate content-text">
          {{ company.category }}
        </span>
        <i class="v-line"></i>
        <span class="truncate content-text">
          {{ company.staffCount }}
        </span>
      </div>
      <div class="company-card-footer">
        <p>
          <span class="text-green-600">{{ company.jobNumber }}个 </span>
          <span>在招岗位</span>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import BaseAspect from '@/components/base/base-aspect'

export default {
  components: {
    BaseAspect
  },
  props: {
    company: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    description() {
      return `${this.company.financingStage} ｜ ${this.company.category} ｜ ${this.company.staffCount}`
    }
  }
}
</script>

<style lang="scss" scoped>
.company-card {
  padding: $gap;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.18);
    transform: translateY(-2px);
  }
  &-header {
    margin-bottom: 8px;
    .text-holder {
      .header-title {
        color: $c-green-600;
        letter-spacing: 0.5px;
      }
    }
  }
  &-body {
    padding-bottom: $gap;
    border-bottom: $dotted-gray;
    display: flex;
    align-items: center;
    .content-text {
      display: inline-block;
      max-width: 70px;
      font-size: 12px;
    }
  }
  &-footer {
    font-size: 13px;
    padding-top: 8px;
  }
}
</style>
