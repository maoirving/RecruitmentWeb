<template>
  <header class="header-wrapper">
    <div class="container">
      <div class="menu-wrapper">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <ul class="flex unstyle-list menu-list">
              <li class="menu-list-item" v-for="(item, index) in menus.left" :key="index">
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
              <li class="menu-list-item" v-for="(item, index) in menus.right" :key="index">
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
        </el-row>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      menus: {
        left: [
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
        ],
        right: [
          {
            title: '进入企业版',
            url: '/admin/login'
          },
          {
            title: '我的',
            name: 'Account',
            url: '/account/profile'
          },
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
        ]
      }
    }
  },

  computed: {
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
    }
  },

  created() {
    console.log(this.$route)
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
