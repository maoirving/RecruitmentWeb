<template>
  <header class="header-wrapper">
    <div class="container">
      <div class="menu-wrapper">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <ul class="flex unstyle-list menu-list">
              <li class="menu-list-item" v-for="(item, index) in leftMenu" :key="index">
                <router-link
                  :class="[
                    'text-link-white',
                    {
                      'text-link': isActive(item.name)
                    }
                  ]"
                  :to="item.url"
                  >{{ item.title }}</router-link
                >
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="flex unstyle-list justify-end menu-list">
              <li class="menu-list-item" v-for="(item, index) in rightMenu" :key="index">
                <router-link
                  :class="[
                    'text-link-white',
                    {
                      'text-link': isActive(item.name)
                    }
                  ]"
                  :to="item.url"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},

  data() {
    return {
      leftMenu: [
        {
          title: '首页',
          name: 'Home',
          url: '/'
        },
        {
          title: '职位',
          name: 'Job',
          url: '/job'
        },
        {
          title: '公司',
          name: 'Company',
          url: '/company'
        }
      ]
    }
  },

  computed: {
    ...mapState('user', ['token']),
    isActive() {
      return name => {
        if (name === this.$route.name) {
          return true
        } else if (name === this.$route.matched[0].name) {
          return true
        } else {
          return false
        }
      }
    },
    rightMenu() {
      let menu = [
        {
          title: '进入企业版',
          url: '/management/job'
        }
      ]
      if (this.token) {
        menu.push(
          {
            title: '我的',
            name: 'Account',
            url: '/account/profile'
          },
          {
            title: '退出登录',
            name: 'Login',
            url: '/login'
          }
        )
      } else {
        menu.push(
          {
            title: '注册',
            name: 'Register',
            url: '/register'
          },
          {
            title: '登录',
            name: 'Login',
            url: '/login'
          }
        )
      }
      return menu
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  color: #fff;
  padding: $gap 0;
  background-color: #414a60;

  .menu-wrapper {
    margin-left: $gap-sm;
    margin-right: $gap-sm;

    .menu-list {
      &-item {
        padding-left: $gap-sm;
        padding-right: $gap-sm;
        .active {
        }
      }
    }
  }
}
</style>
