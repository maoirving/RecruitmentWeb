<template>
  <div class="admin-user">
    <m-table :columns="columns" :data="users" :actions="actions" />
  </div>
</template>

<script>
import MTable from '@/components/module/m-table'

export default {
  components: {
    MTable
  },
  data() {
    return {
      columns: [
        {
          label: '用户名',
          prop: 'username'
        },
        {
          label: '头像',
          prop: 'imageUrl'
        },
        {
          label: '真实姓名',
          prop: 'trueName'
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '出生日期',
          prop: 'birthday'
        },
        {
          label: '手机号码',
          prop: 'phoneNumber'
        },
        {
          label: '电子邮箱',
          prop: 'email'
        },
        {
          label: '当前居住地',
          prop: 'currentAddress'
        },
        {
          label: '注册时间',
          prop: 'registrationTime'
        }
      ],

      actions: [
        {
          label: '编辑',
          type: 'primary',
          events: {
            click(scope) {
              console.log('编辑')
            }
          }
        },
        {
          label: '重置密码',
          type: 'success',
          events: {
            click(scope) {
              console.log('重置密码')
            }
          }
        },
        {
          label: '删除',
          type: 'danger',
          events: {
            click(scope) {
              console.log('删除')
            }
          }
        }
      ],
      users: []
    }
  },

  methods: {
    getUsers() {
      const user = {
        username: 'mao',
        // imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageUrl: 'zanwu',
        trueName: '毛欧文',
        sex: '男',
        birthday: '1999-02-09',
        phoneNumber: '18293039302',
        email: 'wkjd@dk.com',
        currentAddress: '福建厦门',
        registrationTime: '2019-02-09 03:23:22'
      }
      this.users = Array(10).fill(user)
    }
  },

  created() {
    this.getUsers()
  }
}
</script>

<style></style>
