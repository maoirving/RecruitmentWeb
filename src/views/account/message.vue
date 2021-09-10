<template>
  <div>
    <el-tabs type="card">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label">
        <el-row class="flex-wrap" type="flex" :gutter="10">
          <el-col v-for="(message, i) in messages" :key="i">
            <message-card :message="message" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageCard from '@/components/message/message-card'

export default {
  components: {
    MessageCard
  },

  data() {
    return {
      tabs: [
        {
          label: '面试邀请'
        },
        {
          label: '已接受'
        },
        {
          label: '已拒绝'
        }
      ],
      messages: [
        {
          recruiter: '林女士',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/avatar/20201113/8b7aaef75cac2da2a8ad122538abe1842181a86b5b9ec8dab3693f42ed95b558_s.png',
          content: '恭喜您通过我们公司的一轮筛选，现邀请您到我司参加面试',
          company_name: '厉害的公司',
          message_time: '11:59'
        },
        {
          recruiter: '林女士',
          imageUrl:
            'https://img.bosszhipin.com/beijin/upload/avatar/20201113/8b7aaef75cac2da2a8ad122538abe1842181a86b5b9ec8dab3693f42ed95b558_s.png',
          content: '不合适，不好意思',
          company_name: '厉害的公司',
          message_time: '11:59'
        }
      ]
    }
  }
}
</script>

<style></style>
