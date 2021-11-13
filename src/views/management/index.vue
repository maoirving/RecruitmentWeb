<template>
  <el-container class="management-container">
    <el-aside :width="isCollapse ? '58px' : '200px'">
      <div class="header-holder">
        <h3 v-if="!isCollapse" class="text-holder">{{ menuTitle }}</h3>
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
        <template v-for="(menu, index) in managementMenus">
          <el-menu-item
            v-if="!menu.hide"
            :index="menu.name"
            :key="index"
            @click="setContent(menu)"
          >
            <i :class="menu.iconClass"></i>
            <span slot="title">{{ menu.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <admin-header class="header" />
      </el-header>
      <el-main>
        <el-card>
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminHeader from '@/components/management/header'
import { mapGetters } from 'vuex'

export default {
  components: {
    AdminHeader
  },

  data() {
    return {
      isCollapse: false
    }
  },

  computed: {
    ...mapGetters('admin', ['isSuperAdmin', 'isRecruiter']),
    menuTitle() {
      return this.isRecruiter ? '企业版' : '后台管理'
    },
    managementMenus() {
      const menus = [
        {
          id: '1',
          title: '职位管理',
          name: 'JobManagement',
          url: '/management/job',
          iconClass: 'el-icon-s-promotion'
        },
        {
          id: '2',
          title: '公司管理',
          name: 'CompanyManagement',
          url: '/management/company',
          iconClass: 'el-icon-office-building',
          hide: !this.isSuperAdmin
        },
        {
          id: '3',
          title: '申请管理',
          name: 'ApplicationManagement',
          url: '/management/application',
          iconClass: 'el-icon-s-claim'
        },
        {
          id: '4',
          title: '面试管理',
          name: 'InterviewManagement',
          url: '/management/interview',
          iconClass: 'el-icon-notebook-1'
        },
        {
          id: '5',
          title: '用户管理',
          name: 'UserManagement',
          url: '/management/user',
          iconClass: 'el-icon-user',
          hide: !this.isSuperAdmin
        },
        {
          id: '6',
          title: '我的信息',
          name: 'ProfileManagement',
          url: '/management/profile',
          iconClass: 'el-icon-set-up'
        }
      ]
      return menus
    }
  },

  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setContent(menu) {
      if (this.activeIndex === menu.name) {
        return
      }
      this.activeIndex = menu.name
      this.$router.push({ name: menu.name })
    }
  },

  created() {
    if (this.$route.name !== 'admin') {
      this.activeIndex = this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.management-container {
  height: 100vh;
  .el-header {
    height: auto !important;
    padding: 0;
  }
  .el-aside {
    background-color: #333744;
    transition: all 0.4s;
    .header-holder {
      display: flex;
      text-align: right;
      padding: $gap;
      .text-holder {
        font-size: 18px;
        width: 100%;
        text-align: center;
        color: #b3b4af;
      }
      .toggle-icon {
        font-size: 20px;
        margin-left: auto;
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
