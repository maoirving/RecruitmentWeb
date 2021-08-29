<template>
  <div class="job-aside-wrapper">
    <div class="resume-box">
      <h3 class="plain-title">
        我的简历
      </h3>
      <div class="btn-holder">
        <el-button type="success">查看简历</el-button>
        <el-button type="primary">上传简历</el-button>
      </div>
    </div>
    <h3 class="plain-title">
      已申请
    </h3>
    <div class="apply-list">
      <el-row class="flex-wrap" type="flex" :gutter="20">
        <el-col
          class="mb-2"
          v-for="(job, index) in appliedJobs"
          :key="index"
        >
          <job-card is-simple-type :job="job" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import JobCard from '@/components/job/job-card'

export default {
  components: {
    JobCard
  },
  data() {
    return {
      appliedJobs: [
        {
          name: '高级前端开发工程师',
          salary: '12-20k',
          city: '厦门',
          experience: '经验不限',
          education: '本科',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          company: {
            name: '字节跳动科技有限公司',
            financingStage: '已上市'
          }
        },
        {
          name: '高级前端开发工程师',
          salary: '12-20k',
          city: '厦门',
          experience: '经验不限',
          education: '本科',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          company: {
            name: '字节跳动科技有限公司',
            financingStage: '已上市'
          }
        },
        {
          name: '高级前端开发工程师',
          salary: '12-20k',
          city: '厦门',
          experience: '经验不限',
          education: '本科',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          company: {
            name: '字节跳动科技有限公司',
            financingStage: '已上市'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.job-aside-wrapper {
}
</style>
