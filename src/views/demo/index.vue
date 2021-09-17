<template>
  <div class="demo-page">
    <div class="demo-content">
      <m-form :form-items="formItems" :form-data="formData">
        <div slot="salary">
          <div>
            <el-input-number v-model="formData.minSalary" :step="1" :min="1"></el-input-number>
            <span class="horizontal-line"> - </span>
            <el-input-number
              v-model="formData.maxSalary"
              :step="1"
              :min="formData.minSalary + 1"
            ></el-input-number>
            <span class="suffix">
              K
            </span>
          </div>
        </div>
      </m-form>
      <el-button @click="show">
        show
      </el-button>
    </div>
  </div>
</template>

<script>
import MForm from '@/components/module/m-form'

export default {
  components: {
    MForm
  },

  data() {
    return {
      formItems: [
        {
          // label: '用户名',
          prop: 'username',
          control: {
            attrs: {
              'prefix-icon': 'el-icon-user',
              placeholder: '请输入用户名'
            }
          }
        },
        {
          // label: '密码',
          prop: 'password',
          control: {
            attrs: {
              'prefix-icon': 'el-icon-lock',
              type: 'password',
              placeholder: '请输入密码'
            }
          }
        },
        {
          label: '出生日期',
          prop: 'date',
          control: {
            component: 'el-date-picker',
            attrs: {
              type: 'daterange'
            }
          }
        },
        {
          label: '性别',
          prop: 'sex',
          control: {
            component: 'm-radio-group',
            attrs: {
              options: [
                {
                  label: '男',
                  key: 0
                },
                {
                  label: '女',
                  key: 1
                }
              ]
            }
          }
        },
        {
          label: '期望工资',
          slot: 'salary'
        }
      ],

      formData: {
        username: '121',
        password: '',
        date: '',
        sex: '',
        minSalary: '',
        maxSalary: ''
      }
    }
  },

  methods: {
    show() {
      console.log(this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .demo-content {
    width: 50%;
    height: 50vh;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
