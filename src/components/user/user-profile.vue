<template>
  <div class="user-profile">
    <div class="image-holder">
      <el-avatar :size="100" :src="imageUrl" />
    </div>
    <el-row class="flex-wrap profile-list" type="flex" :gutter="20">
      <el-col
        class="profile-list-item"
        :span="12"
        v-for="(item, index) in visibleProfileItems"
        :key="index"
      >
        <label class="label" for="">{{ item.label }}：</label>
        <span class="content">{{ profileForm[item.prop] }}</span>
      </el-col>
    </el-row>
    <div class="text-right btn-holder">
      <el-button size="small" round @click="showDialog">
        修改个人信息
      </el-button>
      <el-button size="small" type="danger" round @click="showPasswordDialog">
        修改密码
      </el-button>
    </div>
    <div class="dialog-wrapper">
      <user-edit-dialog ref="editDialogRef" is-profile-type />
      <change-password-dialog ref="passwordDialogRef" />
    </div>
  </div>
</template>

<script>
import UserEditDialog from '@/components/user/user-edit-dialog'
import ChangePasswordDialog from '@/components/user/change-password-dialog'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    UserEditDialog,
    ChangePasswordDialog
  },

  props: {
    profileType: {
      type: String,
      default: 'worker'
    }
  },

  data() {
    return {
      profileItems: [
        {
          label: '姓名',
          prop: 'realName'
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
        }
      ],
      profileForm: {}
    }
  },

  computed: {
    ...mapGetters('admin', ['isRecruiter']),
    imageUrl() {
      return this.profileForm.imageUrl ?? require('@/assets/images/user.png')
    },
    visibleProfileItems() {
      const newItems = this.profileItems
      if (this.isRecruiter) {
        newItems.push({
          label: '所属公司',
          prop: 'companyName'
        })
      }
      return newItems
    }
  },

  methods: {
    ...mapActions('user', ['getUserInfo']),
    ...mapActions('admin', ['getAdminInfo']),
    showDialog() {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.outerThis = this
      this.$refs.editDialogRef.outerData = this.profileForm
    },
    showPasswordDialog() {
      this.$refs.passwordDialogRef.dialogVisible = true
    },
    async reload() {
      let data = {}
      if (this.$route.matched[0].name === 'Management') {
        data = await this.getUserInfo()
      } else {
        data = await this.getAdminInfo()
      }
      this.profileForm = data.user
      this.profileForm.companyName = data.user?.Company?.name
      if (this.profileForm.birthday) {
        this.profileForm.birthday = moment(this.profileForm.birthday)
          .utcOffset(0)
          .format('YYYY-MM-DD')
      }
    }
  },

  mounted() {
    this.reload()
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  .image-holder {
    text-align: center;
    margin-bottom: 30px;
  }
  .profile-list {
    &-item {
      margin-bottom: 40px;
      .label {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .content {
        display: inline-block;
        min-width: 200px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
