<template>
  <el-dialog
    class="awesome-scrollbar profile-dialog"
    title="个人信息修改"
    width="40%"
    :center="true"
    v-bind="$attrs"
    :before-close="handleClose"
    @closed="closed"
  >
    <el-form ref="profileFormRef" :model="profileForm" :rules="profileFormRules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="profileForm.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="trueName">
        <el-input v-model="profileForm.trueName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="profileForm.sex">
          <el-radio label="1" border>男</el-radio>
          <el-radio label="2" border>女</el-radio>
        </el-radio-group>
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
        username: '',
        trueName: '',
        sex: '',
        birthday: '',
        phoneNumber: '',
        email: '',
        currentAddress: ''
      },
      profileFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        trueName: [{ required: true, message: '真实姓名不能为空', trigger: 'blur' }]
      }
    }
  },

  methods: {
    handleClose() {
      this.$confirm('填写内容不会保存，确认关闭？', { type: 'warning' })
        .then(() => {
          this.$emit('close-dialog')
        })
        .catch(() => {})
    },

    closed() {
      this.$refs.profileFormRef.resetFields()
    },

    handleEdit() {
      this.$refs.profileFormRef.validate(async valid => {
        if (!valid) return
        this.$confirm('确认修改？', { type: 'warning' })
          .then(() => {
            this.$message.success('修改成功！')
            this.$emit('close-dialog')
          })
          .catch(() => {})
      })
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.profile-dialog {
  .el-radio {
    margin-right: $gap-sm;
  }
}
</style>
