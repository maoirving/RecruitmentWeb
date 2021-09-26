<template>
  <el-input
    class="base-password-input"
    :type="typeController[currentIndex].type"
    v-model="innerValue"
    v-bind="$attrs"
  >
    <template slot="suffix">
      <font-awesome-icon
        class="icon"
        :icon="['far', typeController[currentIndex].icon]"
        @click="toggleIcon"
      />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'BasePasswordInput',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      innerValue: '',
      currentIndex: 0,
      typeController: [
        {
          type: 'password',
          icon: 'eye-slash'
        },
        {
          type: 'text',
          icon: 'eye'
        }
      ]
    }
  },

  watch: {
    innerValue(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    toggleIcon() {
      this.currentIndex = this.currentIndex ? 0 : 1
    }
  }
}
</script>

<style lang="scss" scoped>
.base-password-input {
  .icon {
    cursor: pointer;
  }
}
</style>
