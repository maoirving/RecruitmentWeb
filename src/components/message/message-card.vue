<template>
  <div class="message-card">
    <div @click="showDialog">
      <el-row type="flex" :gutter="20">
        <el-col :span="3">
          <base-aspect data-ratio="1:1" is-circle with-shadow>
            <div class="image-holder">
              <img :src="message.imageUrl" />
            </div>
          </base-aspect>
        </el-col>
        <el-col :span="21">
          <div class="message-right">
            <div class="message-header">
              <h4 class="text-base">{{ message.recruiter }}</h4>
              <span class="time-text">{{ message.message_time }}</span>
            </div>
            <div class="message-body">
              <p>{{ message.company_name }}</p>
            </div>
            <div class="message-footer">
              <p>{{ message.content }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <message-dialog :visible.sync="dialogVisible" @close-dialog="dialogVisible = false" />
  </div>
</template>

<script>
import BaseAspect from '@/components/base/base-aspect'
import MessageDialog from '@/components/message/message-dialog.vue'

export default {
  components: {
    BaseAspect,
    MessageDialog
  },

  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      dialogVisible: false
    }
  },

  methods: {
    showDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.message-card {
  cursor: pointer;
  padding: $gap;
  transition: all 0.3s;
  &:hover {
    background-color: #f2f5fa;
  }
}
.message-right {
  //   padding: $gap;
  .message-header {
    display: flex;
    margin-bottom: $gap-xs;
    .time-text {
      margin-left: auto;
    }
  }
  .message-body {
    margin-bottom: $gap-xs;
  }
}
</style>
