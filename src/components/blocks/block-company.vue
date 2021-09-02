<template>
  <block-section title="热门企业" url="/company">
    <template slot="block-content">
      <el-row class="flex-wrap" type="flex" :gutter="20">
        <el-col class="mb-3" :span="6" v-for="(company, index) in companys" :key="index">
          <company-card :company="company" />
        </el-col>
      </el-row>
    </template>
  </block-section>
</template>

<script>
import BlockSection from '@/components/blocks/common/block-section'
import CompanyCard from '@/components/company/company-card'

export default {
  components: {
    BlockSection,
    CompanyCard
  },

  data() {
    return {
      companys: []
    }
  },

  methods: {
    getCompanys() {
      const company = {
        id: 1,
        name: '北京字节跳动科技有限公司',
        imageUrl:
          'https://img.bosszhipin.com/beijin/mcs/bar/20191211/cff98890aeac18b0f4dee3577d92d543be1bd4a3bd2a63f070bdbdada9aad826.jpg?x-oss-process=image/resize,w_120,limit_0',
        category: '游戏',
        financingStage: '已上市',
        staffCount: '1000人以上',
        jobNumber: '10'
      }
      for (let i = 0; i < 4; i++) {
        this.companys.push(company)
      }
    }
  },

  created() {
    this.getCompanys()
  }
}
</script>
