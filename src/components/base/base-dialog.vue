<template>
  <el-dialog
    class="awesome-scrollbar"
    :width="dialogWidth"
    top="5vh"
    :center="true"
    v-bind="$attrs"
    v-on="$listeners"
    :before-close="handleClose"
    destroy-on-close
  >
    <div class="dialog-content">
      <slot name="dialog-form" />
    </div>
    <div slot="footer" class="text-right">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button
        v-if="!hideSaveBtn"
        type="primary"
        size="small"
        @click="handleSave"
        :disabled="disabled"
      >
        {{ saveBtnText }}
      </el-button>
      <slot name="extra-button" />
    </div>
  </el-dialog>
</template>

<script>
import BaseForm from '@/components/base/base-form'

export default {
  components: {
    BaseForm
  },

  props: {
    dialogWidth: {
      type: String,
      default: '50%'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    saveBtnText: {
      type: String,
      default: '保存'
    },
    hideSaveBtn: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSave() {
      this.$emit('save')
    }
  }
}
</script>
