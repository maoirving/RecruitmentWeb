<template>
  <div class="profile-wrapper">
    <div class="image-holder">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-avatar v-if="profileForm.imageUrl" :size="100" :src="profileForm.imageUrl" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-row class="flex-wrap profile-list" type="flex" :gutter="20">
      <el-col
        class="profile-list-item"
        :span="12"
        v-for="(item, index) in profileList"
        :key="index"
      >
        <label class="label" for="">{{ item.label }}：</label>
        <span class="content">{{ profileForm[item.model] }}</span>
      </el-col>
    </el-row>
    <div class="text-right btn-holder">
      <el-button size="small" round @click="showDialog">
        修改个人信息
      </el-button>
    </div>
    <div class="dialog-wrapper">
      <profile-form-dialog
        ref="profileDialogRef"
        :user-id="profileForm.id"
        :visible.sync="dialogVisible"
        @close-dialog="dialogVisible = false"
        @reload="handleReload"
      />
    </div>
  </div>
</template>

<script>
import ProfileFormDialog from '@/components/account/profile/profile-form-dialog'
import moment from 'moment'
import { cloneDeep } from 'lodash'

export default {
  components: {
    ProfileFormDialog
  },
  data() {
    return {
      profileList: [
        {
          label: '姓名',
          model: 'realName'
        },
        {
          label: '性别',
          model: 'sex'
        },
        {
          label: '出生日期',
          model: 'birthday'
        },
        {
          label: '手机号码',
          model: 'phoneNumber'
        },
        {
          label: '电子邮箱',
          model: 'email'
        },
        {
          label: '当前居住地',
          model: 'currentAddress'
        }
      ],
      profileForm: {},
      dialogVisible: false
    }
  },

  methods: {
    async getUser() {
      const userId = window.sessionStorage.getItem('userId')
      const res = await this.$axios.get(`/users/${userId}`)
      if (res.data.user) {
        this.profileForm = res.data.user
        this.profileForm.birthday = moment(this.profileForm.birthday)
          .utcOffset(0)
          .format('YYYY-MM-DD')
      }
    },
    beforeAvatarUpload() {
      console.log('beforeAvatarUpload')
    },
    handleAvatarSuccess() {
      console.log('handleAvatarSuccess')
    },
    showDialog() {
      this.dialogVisible = true
      this.$refs.profileDialogRef.profileForm = cloneDeep(this.profileForm)
    },
    handleReload() {
      this.dialogVisible = false
      this.getUser()
    }
  },

  mounted() {
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>
.profile-wrapper {
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
