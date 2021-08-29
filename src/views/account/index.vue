<template>
  <app-layout>
    <el-row class="account-wrapper" :gutter="20">
      <el-col :span="6">
        <h2 class="primary-title">我的</h2>
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
          <template v-for="(item, index) in accountMenus">
            <el-menu-item
              :key="index"
              :index="item.name"
              @click="setContent(item)"
            >
              <i :class="item.iconClass"></i>
              <span slot="title">
                {{ item.title }}
              </span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view />
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
          title: '消息管理',
          name: 'message',
          url: '/account/message',
          iconClass: 'el-icon-chat-dot-round'
        },
        {
          id: '5',
          title: '我的收藏',
          name: 'favorite',
          url: '/account/favorite',
          iconClass: 'el-icon-star-on'
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

<style></style>
