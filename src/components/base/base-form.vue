<template>
  <el-form ref="form" :model="formData" :label-width="labelWidth" :rules="rules" v-bind="$attrs">
    <template slot="default" v-for="(item, index) in visibleFormItems">
      <el-form-item :label="item.label" :prop="item.prop" :key="index">
        <slot v-if="item.slot" :name="item.slot" :form-data="formData" />
        <component
          v-else
          :is="componentControl(item.control)"
          v-model="formData[item.prop]"
          v-bind="componentAttrs(item)"
          v-on="componentEvents(item, formData)"
        />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  components: {
    BaseRadioGroup: () => import('@/components/base/base-radio-group'),
    BaseSelect: () => import('@/components/base/base-select'),
    BaseUpload: () => import('@/components/base/base-upload')
  },

  props: {
    labelWidth: {
      type: String,
      default: '80px'
    },

    formData: {
      type: Object,
      default: () => {}
    },

    formItems: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  computed: {
    visibleFormItems() {
      return this.formItems.filter(item => item.visible !== false)
    },
    rules() {
      const ruleObj = {}
      this.formItems.forEach((item, index) => {
        if (!item.rule) {
          return
        }
        ruleObj[item.prop] = []
        if (item.rule instanceof Array) {
          ruleObj[item.prop] = item.rule
          return
        }
        const ruleArr = item.rule.split('|')
        ruleArr.forEach(rule => {
          if (rule === 'required') {
            let message = '必填'
            const componentMap = ['base-select', 'base-radio-group', 'el-date-picker']
            if (item.control && componentMap.indexOf(item.control.component) !== -1) {
              message = '必选'
            }
            const obj = {
              required: true,
              message: message,
              trigger: 'blur'
            }
            ruleObj[item.prop].push(obj)
          }
          if (rule === 'username') {
            const obj = {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const reg = /^[a-zA-Z0-9_-]{4,16}$/
                if (!reg.test(value)) {
                  callback(new Error('至少四位，由字母、数字或下划线组成'))
                } else {
                  callback()
                }
              }
            }
            ruleObj[item.prop].push(obj)
          }
          if (rule === 'password') {
            const obj = {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字
                const reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
                if (!reg.test(value)) {
                  callback(new Error('密码长度6~16位，且至少包含1个大写字母、小写字母和数字'))
                } else {
                  callback()
                }
              }
            }
            ruleObj[item.prop].push(obj)
          }
          if (rule === 'phone') {
            const obj = {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
                  if (!reg.test(value)) {
                    callback(new Error('手机号格式错误'))
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            }
            ruleObj[item.prop].push(obj)
          }
          if (rule === 'email') {
            const obj = {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                  if (!reg.test(value)) {
                    callback(new Error('邮箱格式错误'))
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            }
            ruleObj[item.prop].push(obj)
          }
        })
      })
      return ruleObj
    }
  },

  methods: {
    componentControl(control) {
      if (!control || !control.component) {
        return 'el-input'
      }
      return control.component
    },

    componentAttrs(item) {
      const attrs = {}
      const componentAttrs = item.control && item.control.attrs
      if (componentAttrs) {
        for (const key in componentAttrs) {
          attrs[key] = componentAttrs[key]
        }
      }
      const placeholderPrefixs = {
        'el-input': '请输入',
        'base-select': '请选择',
        'el-date-picker': '请选择'
      }

      const component = this.componentControl(item.control)
      const prefix = placeholderPrefixs[component]

      if (prefix) {
        attrs['placeholder'] = attrs['placeholder'] || prefix + item.label
      }
      return attrs
    },
    componentEvents(item, scope) {
      if (!item.control || !item.control.events) {
        return {}
      }
      const events = {}
      for (const key in item.control.events) {
        const func = item.control.events[key]
        const ctx = {
          scope,
          item
        }
        events[key] = (...args) => func.call(this, ...args, ctx, this)
      }
      return events
    }
  }
}
</script>
