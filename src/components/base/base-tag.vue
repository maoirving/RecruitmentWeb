<template>
  <div>
    <el-tag v-bind="$attrs">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'KbTags',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
