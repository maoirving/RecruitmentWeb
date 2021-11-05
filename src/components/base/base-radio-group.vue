<template>
  <el-radio-group class="base-radio-group" v-model="innerValue">
    <el-radio v-for="(option, i) in options" :key="i" :label="option[optionValue]" border>
      {{ option[optionLabel] }}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'BaseRadioGroup',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    optionLabel: {
      type: String,
      default: 'label'
    }
  },

  data() {
    return {
      innerValue: ''
    }
  },

  watch: {
    innerValue(value) {
      this.$emit('change', value)
    },
    value: {
      handler(val) {
        if (val !== this.innerValue) {
          this.innerValue = val
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-radio-group {
  .el-radio {
    margin-right: 10px;
  }
}
</style>
