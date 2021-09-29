<template>
  <el-radio-group class="base-radio-group" v-model="innerValue" v-bind="$attrs">
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
      innerValue: this.value
    }
  },

  watch: {
    innerValue(value) {
      this.$emit('change', value)
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
