<template>
  <el-dialog title="个人信息修改" width="40%" v-bind="$attrs" :before-close="handleClose">
    <el-form ref="form" :model="profileForm" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="profileForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="profileForm.sex"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="profileForm.birthday" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="profileForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="profileForm.email"></el-input>
      </el-form-item>
      <el-form-item label="当前住址">
        <el-input v-model="profileForm.currentAddress"></el-input>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEdit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      profileForm: {
        name: '',
        sex: '',
        birthday: '',
        phoneNumber: '',
        email: '',
        currentAddress: ''
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close-dialog')
    },
    handleEdit() {
      this.$confirm('确认修改？', { type: 'warning' })
        .then(() => {
          this.$message.success('修改成功！')
          this.$emit('close-dialog')
        })
        .catch(() => {})
    }
  },
  created() {}
}
</script>

<style></style>
