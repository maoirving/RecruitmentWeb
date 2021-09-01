<template>
  <div class="job-aside-wrapper">
    <el-card>
      <div class="title-holder">
        <h3 class="text-lg title-text">
          已申请的职位
        </h3>
        <router-link class="text-link title-link" to="/account/applied">
          <span>
            查看更多
          </span>
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </div>

      <el-row class="flex-wrap applied-list" type="flex" :gutter="20">
        <el-col
          class="applied-list-item"
          v-for="(job, index) in appliedJobs"
          :key="index"
        >
          <job-card is-simple-type :job="job" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import JobCard from '@/components/job/job-card'

export default {
  components: {
    JobCard
  },

  props: {
    appliedJobs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.job-aside-wrapper {
  .title-holder {
    display: flex;
    align-items: center;
    padding-bottom: $gap;
    margin-bottom: $gap;
    border-bottom: $dashed-gray;
    .title-link {
      margin-left: auto;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .applied-list {
    &-item {
      margin-bottom: $gap;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
