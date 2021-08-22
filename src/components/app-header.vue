<template>
  <header class="header-wrapper">
    <div class="container">
      <el-row class="menu-wrapper" :gutter="20">
        <el-col :span="16">
          <ul class="menu-list">
            <li
              class="menu-list-item"
              v-for="(item, index) in menus.left"
              :key="index"
            >
              <router-link :to="item">{{ item.name }}</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="menu-list">
            <li
              class="menu-list-item"
              v-for="(item, index) in menus.right"
              :key="index"
            >
              <router-link :to="item.url">{{ item.name }}</router-link>
            </li>
          </ul>
        </el-col>
      </el-row>
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
            name: '首页',
            url: '/'
          },
          {
            name: '职位',
            url: '/job'
          },
          {
            name: '公司',
            url: '/company'
          }
        ],
        right: [
          {
            name: '进入企业版',
            url: '/'
          },
          {
            name: '注册',
            url: '/register'
          },
          {
            name: '登录',
            url: '/login'
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  color: #fff;
  padding: 10px 0;
  background-color: #414a60;

  .menu-wrapper {
    display: flex;
    justify-content: space-between;
    margin-left: -10px;
    margin-right: -10px;

    .menu-list {
      display: flex;
      &-item {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
}
</style>
