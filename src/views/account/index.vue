<template>
  <app-layout>
    <el-row class="account-wrapper" :gutter="15">
      <el-col :span="5">
        <el-card class="menu-card">
          <h2 class="text-2xl menu-title">我的</h2>
          <el-menu class="account-menu" :default-active="activeIndex">
            <template v-for="(item, index) in accountMenus">
              <el-menu-item :key="index" :index="item.name" @click="setContent(item)">
                <i :class="item.iconClass"></i>
                <span slot="title">
                  {{ item.title }}
                </span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="content-card">
          <h2 class="text-xl content-title">
            {{ titleText }}
          </h2>

          <div class="content-container">
            <router-view />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </app-layout>
</template>

<script>
import AppLayout from '@/layout/app-layout'

export default {
  components: {
    AppLayout
  },
  data() {
    return {
      activeIndex: 'profile',
      accountMenus: [
        {
          id: '1',
          title: '个人信息',
          name: 'profile',
          url: '/account/profile',
          iconClass: 'el-icon-s-custom'
        },
        {
          id: '2',
          title: '我的简历',
          name: 'resume',
          url: '/account/resume',
          iconClass: 'el-icon-notebook-2'
        },
        {
          id: '3',
          title: '我的申请',
          name: 'application',
          url: '/account/application',
          iconClass: 'el-icon-s-claim'
        },
        {
          id: '4',
          title: '面试管理',
          name: 'interview',
          url: '/account/interview',
          iconClass: 'el-icon-notebook-1'
        },
        {
          id: '5',
          title: '消息管理',
          name: 'message',
          url: '/account/message',
          iconClass: 'el-icon-chat-dot-round'
        },
        {
          id: '6',
          title: '修改密码',
          name: 'resetPassword',
          url: '/account/resetPassword',
          iconClass: 'el-icon-key'
        }
      ],
      jobs: [
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
  },

  computed: {
    titleText() {
      let title = ''
      this.accountMenus.forEach(item => {
        if (item.name === this.activeIndex) {
          title = item.title
        }
      })
      return title
    }
  },

  methods: {
    setContent(menu) {
      this.activeIndex = menu.name
      this.$router.push({ name: menu.name })
    }
  },

  created() {
    if (this.$route.name !== 'account') {
      this.activeIndex = this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.account-wrapper {
  .menu-card {
    ::v-deep .el-card__body {
      padding: 20px 0 0;
    }
    .menu-title {
      padding-left: 20px;
      margin-bottom: $gap;
    }
    .account-menu {
      border-right: 0;
    }
  }
  .content-card {
    min-height: 80vh;
    .content-title {
      padding-bottom: $gap;
      margin-bottom: $gap-lg;
      border-bottom: $solid-gray;
    }

    .content-container {
      padding: $gap $gap-lg;
    }
  }
}
</style>
