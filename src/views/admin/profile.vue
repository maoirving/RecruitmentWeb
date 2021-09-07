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
      <el-button @click="showDialog">
        修改个人信息
      </el-button>
    </div>
    <div class="dialog-wrapper">
      <profile-form-dialog :visible.sync="dialogVisible" @close-dialog="dialogVisible = false" />
    </div>
  </div>
</template>

<script>
import ProfileFormDialog from '@/components/account/dialog/profile-form-dialog'

export default {
  components: {
    ProfileFormDialog
  },
  data() {
    return {
      profileList: [
        {
          label: '姓名',
          model: 'name'
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
      profileForm: {
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '毛欧文',
        sex: '男',
        birthday: '1999-01-16',
        phoneNumber: '18359404948',
        email: 'eje@dk.com',
        currentAddress: '福建厦门'
      },
      dialogVisible: false
    }
  },

  methods: {
    beforeAvatarUpload() {
      console.log('beforeAvatarUpload')
    },

    handleAvatarSuccess() {
      console.log('handleAvatarSuccess')
    },

    showDialog() {
      this.dialogVisible = true
    }
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
