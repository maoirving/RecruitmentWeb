<template>
  <header class="header-wrapper">
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
                  'text-link-black',
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
            <li v-if="isRecruiter" class="menu-list-item">
              <a class="text-link-black" href="javascript:;" @click="handleJump"
                >管理员登录</a
              >
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
                  'text-link-black',
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
                class="text-link-black"
                href="javascript:;"
                @click="handleLogout"
                >退出登录</a
              >
            </li>
          </ul>
        </el-col>
      </el-row>
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
          title: '进入求职版',
          name: 'Home',
          url: '/'
        }
      ]
    }
  },

  computed: {
    ...mapState('admin', ['avatar']),
    ...mapGetters('admin', ['isAuthenticated', 'isSuperAdmin', 'isRecruiter']),
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
          name: 'ProfileManagement',
          url: '/management/profile',
          imageUrl: this.avatar ?? require('@/assets/images/user.png')
        }
      ]
      return menu
    }
  },

  methods: {
    ...mapActions('admin', ['getAdminInfo', 'logout']),
    handleJump() {
      this.$confirm('前往登录页面会自动退出当前账号，是否确认？', {
        type: 'warning'
      })
        .then(() => {
          this.logout()
            .then(() => {
              this.$router.push('/management/login')
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
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
    this.getAdminInfo('admin')
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  color: #000;
  padding: $gap-sm;
  background-color: #fff;

  .menu-wrapper {
    margin-left: $gap-sm;
    margin-right: $gap-sm;

    .menu-list {
      &-item {
        padding-left: $gap;
        padding-right: $gap;
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
