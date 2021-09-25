<template>
  <div class="company-card">
    <router-link
      class="link"
      :to="{
        path: '/company/detail',
        query: {
          companyId: company.id
        }
      }"
    >
      <div class="company-card-header">
        <el-row type="flex" align="middle" :gutter="20">
          <el-col :span="8">
            <base-aspect data-ratio="1:1" is-rounded-rectangle with-shadow>
              <div class="image-holder">
                <img :src="company.imageUrl" :alt="company.name" />
              </div>
            </base-aspect>
          </el-col>
          <el-col :span="16">
            <div class="text-holder">
              <h4
                class="text-sm font-normal header-title"
                :class="{ 'text-green-600': !isSimpleType }"
              >
                {{ company.name }}
              </h4>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="company-card-body" :class="{ 'mb-2': !isSimpleType }">
        <span class="truncate content-text">
          {{ company.financingStage }}
        </span>
        <el-divider direction="vertical" />
        <span class="truncate content-text">
          {{ company.type }}
        </span>
        <el-divider direction="vertical" />
        <span class="truncate content-text">
          {{ company.scale }}
        </span>
      </div>
      <div v-if="!isSimpleType" class="company-card-footer">
        <p>
          <span class="text-green-600">{{ company.Jobs.length }}个 </span>
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
    isSimpleType: {
      type: Boolean,
      default: false
    },

    company: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.company-card {
  padding: $gap-sm $gap;
  background-color: $c-white;
  border: $solid-gray;
  border-radius: 8px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  &-header {
    margin-bottom: 8px;
    .text-holder {
      .header-title {
        letter-spacing: 0.5px;
      }
    }
  }
  &-body {
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
    border-top: $dotted-gray;
  }
}
</style>
