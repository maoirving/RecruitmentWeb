<template>
  <div class="resetPassword-wrapper">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      :validate-on-rule-change="false"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button @click="onReset">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        password2: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.$message.success('密码修改成功！')
      })
    },

    onReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.resetPassword-wrapper {
  width: 66%;
}
</style>
