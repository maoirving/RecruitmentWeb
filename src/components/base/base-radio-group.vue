<template>
  <el-radio-group v-model="innerValue" v-bind="$attrs">
    <el-radio v-for="(option, i) in options" :key="i" :label="option[optionKey]" border>
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
    optionKey: {
      type: String,
      default: 'key'
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
