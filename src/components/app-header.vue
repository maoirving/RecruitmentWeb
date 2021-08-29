<template>
  <header class="header-wrapper">
    <div class="container">
      <div class="menu-wrapper">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <ul class="flex unstyle-list menu-list">
              <li
                class="menu-list-item"
                v-for="(item, index) in menus.left"
                :key="index"
              >
                <router-link class="text-link-white" :to="item.url">{{
                  item.name
                }}</router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="flex unstyle-list justify-end menu-list">
              <li
                class="menu-list-item"
                v-for="(item, index) in menus.right"
                :key="index"
              >
                <router-link class="text-link-white" :to="item.url">{{
                  item.name
                }}</router-link>
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
            name: '我的',
            url: '/account'
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
$menu-gap: 10px;

.header-wrapper {
  color: #fff;
  padding: 15px 0;
  background-color: #414a60;

  .menu-wrapper {
    margin-left: (-$menu-gap);
    margin-right: (-$menu-gap);

    .menu-list {
      &-item {
        padding-left: $menu-gap;
        padding-right: $menu-gap;
      }
    }
  }
}
</style>
