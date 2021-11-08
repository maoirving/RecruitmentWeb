<template>
  <header class="header-wrapper">
    <div class="container">
      <div class="menu-wrapper">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <ul class="flex items-center unstyle-list menu-list">
              <li
                class="menu-list-item"
                v-for="(item, index) in leftMenu"
                :key="index"
              >
                <router-link
                  :class="[
                    'text-link-white',
                    {
                      flex: !!item.imageUrl
                    },
                    {
                      'text-link': isActive(item.name)
                    }
                  ]"
                  :to="item.url"
                >
                  <el-avatar
                    v-if="item.imageUrl"
                    size="medium"
                    :src="item.imageUrl"
                  />
                  <span v-else>{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </el-col>
          <el-col class="flex items-center justify-end" :span="8">
            <ul class="flex items-center unstyle-list menu-list">
              <li
                class="menu-list-item"
                v-for="(item, index) in rightMenu"
                :key="index"
              >
                <router-link
                  :class="[
                    'text-link-white',
                    {
                      flex: !!item.imageUrl
                    },
                    {
                      'text-link': isActive(item.name)
                    }
                  ]"
                  :to="item.url"
                  :target="item.target"
                >
                  <el-avatar
                    v-if="item.imageUrl"
                    size="medium"
                    :src="item.imageUrl"
                  />
                  <span v-else>{{ item.title }}</span>
                </router-link>
              </li>
              <li v-if="isAuthenticated" class="menu-list-item">
                <a
                  class="text-link-white"
                  href="javascript:;"
                  @click="handleLogout"
                  >退出登录</a
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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {},

  data() {
    return {
      leftMenu: [
        {
          name: 'Home',
          url: '/',
          imageUrl: require('@/assets/images/logo.png')
        },
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
    ...mapState('user', ['avatar']),
    ...mapGetters('user', ['isAuthenticated']),
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
          url: '/management/job',
          target: '_blank'
        }
      ]
      if (this.isAuthenticated) {
        menu.push({
          name: 'Account',
          url: '/account/profile',
          imageUrl: this.avatar ?? require('@/assets/images/user.png')
        })
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
  },

  methods: {
    ...mapActions('user', ['getUserInfo', 'logout']),
    handleLogout() {
      this.$confirm('确认退出登录？', { type: 'warning' })
        .then(() => {
          this.logout()
            .then(() => {
              this.$message({
                type: 'success',
                message: '已退出！',
                duration: 1000,
                onClose: () => {
                  this.$router.go()
                }
              })
            })
            .catch(() => {})
        })
        .catch(() => {})
    }
  },

  mounted() {
    if (this.isAuthenticated) {
      this.getUserInfo()
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  color: #fff;
  padding: $gap-sm 0;
  background-color: #414a60;

  .menu-wrapper {
    margin-left: $gap-sm;
    margin-right: $gap-sm;

    .menu-list {
      &-item {
        padding-left: $gap-sm;
        padding-right: $gap-sm;
      }
    }
  }
}
::v-deep .el-avatar {
  img {
    width: 100%;
  }
}
</style>
