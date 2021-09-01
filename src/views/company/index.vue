<template>
  <app-layout>
    <el-row class="menu-wrapper" :gutter="20">
      <el-col :span="17">
        <el-card>
          <h2 class="primary-title">
            公司列表
          </h2>
          <company-search class="mb-2" />
          <el-row class="flex-wrap" type="flex" :gutter="20">
            <el-col
              class="mb-2"
              :span="8"
              v-for="(company, index) in companys"
              :key="index"
            >
              <company-card :company="company" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <h3 class="plain-title">
            已申请
          </h3>
          <div class="apply-list">
            wo
          </div>
        </el-card>
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'
import companySearch from '@/components/search/company-search'
import CompanyCard from '@/components/company/company-card'

export default {
  components: {
    AppLayout,
    companySearch,
    CompanyCard
  },
  data() {
    return {
      companys: [
        {
          id: 1,
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '游戏',
          financingStage: '已上市',
          staffCount: '1000人以上'
        },
        {
          id: 1,
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '游戏',
          financingStage: '已上市',
          staffCount: '1000人以上'
        },
        {
          id: 1,
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '游戏',
          financingStage: '已上市',
          staffCount: '1000人以上'
        },
        {
          id: 1,
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '游戏',
          financingStage: '已上市',
          staffCount: '1000人以上'
        },
        {
          id: 1,
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '游戏',
          financingStage: '已上市',
          staffCount: '1000人以上'
        },
        {
          id: 1,
          name: '字节跳动科技有限公司',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg',
          category: '游戏',
          financingStage: '已上市',
          staffCount: '1000人以上'
        }
      ]
    }
  }
}
</script>

<style></style>
