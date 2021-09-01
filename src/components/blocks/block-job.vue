<template>
  <block-section title="最新职位" url="/job">
    <template slot="block-content">
      <el-row class="flex-wrap" type="flex" :gutter="20">
        <el-col class="mb-2" v-for="(job, index) in jobs" :key="index" :span="8">
          <job-card :job="job" />
        </el-col>
      </el-row>
    </template>
  </block-section>
</template>

<script>
import BlockSection from '@/components/blocks/common/block-section'
import JobCard from '@/components/job/job-card'

export default {
  components: {
    BlockSection,
    JobCard
  },

  data() {
    return {
      jobs: []
    }
  },

  methods: {
    getJobs() {
      const job = {
        name: '高级前端开发工程师',
        salary: '12-20k',
        city: '厦门',
        experience: '经验不限',
        education: '本科',
        company: {
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '计算机',
          financingStage: '已上市'
        }
      }
      for (let i = 0; i < 6; i++) {
        this.jobs.push(job)
      }
    }
  },

  created() {
    this.getJobs()
  }
}
</script>

<style lang="scss" scoped>
.block-section {
}
</style>
