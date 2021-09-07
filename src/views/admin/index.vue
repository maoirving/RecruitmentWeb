<template>
  <el-container class="admin-container">
    <el-header>
      <app-header class="header" />
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '58px' : '200px'">
        <div class="icon-holder">
          <i
            :class="[
              'toggle-icon',
              {
                'el-icon-s-unfold': isCollapse
              },
              {
                'el-icon-s-fold': !isCollapse
              }
            ]"
            @click="toggleCollapse"
          >
          </i>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          :collapse="isCollapse"
          :collapse-transition="false"
          active-text-color="#409EFF"
        >
          <el-menu-item
            v-for="(menu, index) in adminMenus"
            :index="menu.name"
            :key="index"
            @click="setContent(menu)"
          >
            <i :class="menu.iconClass"></i>
            <span slot="title">{{ menu.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card>
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from '@/components/app-header'

export default {
  components: {
    AppHeader
  },

  data() {
    return {
      isCollapse: false,

      adminMenus: [
        {
          id: '1',
          title: '职位管理',
          name: 'AdminJob',
          url: '/admin/job',
          iconClass: 'el-icon-s-promotion'
        },
        {
          id: '2',
          title: '公司管理',
          name: 'AdminCompany',
          url: '/admin/company',
          iconClass: 'el-icon-office-building'
        },
        {
          id: '3',
          title: '消息管理',
          name: 'AdminMessage',
          url: '/admin/message',
          iconClass: 'el-icon-chat-dot-round'
        },
        {
          id: '4',
          title: '用户管理',
          name: 'AdminUser',
          url: '/admin/user',
          iconClass: 'el-icon-user'
        },
        {
          id: '5',
          title: '我的信息',
          name: 'AdminProfile',
          url: '/admin/profile',
          iconClass: 'el-icon-set-up'
        }
      ]
    }
  },

  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setContent(menu) {
      this.activeIndex = menu.name
      this.$router.push({ name: menu.name })
    }
  },

  created() {
    if (this.$route.name !== 'admin') {
      this.activeIndex = this.$route.name
      console.log(this.activeIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  height: 100vh;
  .el-header {
    height: auto !important;
    padding: 0;
  }
  .el-aside {
    background-color: #333744;
    transition: all 0.4s;
    .icon-holder {
      text-align: right;
      padding: $gap;
      .toggle-icon {
        font-size: 20px;
        transition: all 0.3s;
        &:hover {
          color: #fff;
        }
      }
      cursor: pointer;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    .el-card {
      margin: 0;
    }
  }
}
</style>
