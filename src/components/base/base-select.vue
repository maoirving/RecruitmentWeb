<template>
  <el-select class="w-1/2" v-model="selectedValue" v-bind="$attrs">
    <el-option
      v-for="(item, i) in displayOptions"
      :key="i"
      :label="item[optionLabel]"
      :value="item[optionValue]"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import { find } from 'lodash'

export default {
  name: 'BaseSelect',

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
      default: () => []
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    notFoundMessage: {
      type: String,
      default: '无效选项'
    }
  },

  data() {
    return {
      selectedValue: this.value === 0 ? 0 : this.value || null
    }
  },

  computed: {
    displayOptions() {
      const options = this.options.slice()
      if (this.value) {
        const exists = find(options, it => {
          return it[this.optionValue] === this.value
        })
        if (!exists) {
          options.unshift({
            [this.optionLabel]: this.notFoundMessage,
            [this.optionValue]: this.value,
            disabled: true
          })
        }
      }

      return options
    }
  },

  watch: {
    value(value) {
      this.selectedValue = value
    },
    selectedValue(value, oldValue) {
      if (value !== oldValue) {
        this.$emit('change', value)
      }
    }
  }
}
</script>
