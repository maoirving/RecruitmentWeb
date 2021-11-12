<template>
  <div class="interview-card" @click="$emit('click-card', interview)">
    <el-row type="flex" :gutter="20">
      <el-col :span="3">
        <base-aspect data-ratio="1:1" is-circle with-shadow>
          <div class="image-holder">
            <img :src="interview.recruiterImageUrl" />
          </div>
        </base-aspect>
      </el-col>
      <el-col :span="21">
        <div class="interview-right">
          <div class="interview-header">
            <h4 class="text-base header-title">{{ interview.recruiterName }}</h4>
            <div class="right-text">
              <el-tag v-if="interview.agreedStatus === 0" class="mr-2" type="warning" size="mini">
                未处理
              </el-tag>
              <el-tag v-if="interview.agreedStatus === 1" class="mr-2" type="success" size="mini">
                已接受
              </el-tag>
              <el-tag v-if="interview.agreedStatus === -1" class="mr-2" type="danger" size="mini">
                已拒绝
              </el-tag>
              <span>{{ interview.createdAt | dateFormat }}</span>
            </div>
          </div>
          <div class="interview-body">
            <p>{{ interview.companyName }}</p>
          </div>
          <div class="interview-footer">
            <p class="truncate footer-content">{{ interviewDetail }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BaseAspect from '@/components/base/base-aspect'
import InterviewEditDialog from '@/components/interview/interview-edit-dialog'
import moment from 'moment'

export default {
  components: {
    BaseAspect,
    InterviewEditDialog
  },

  props: {
    interview: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    interviewDetail() {
      return `面试时间：${this.formatDate(this.interview.interviewAt)}，面试地点：${
        this.interview.address
      }，备注：${this.interview.tip}`
    }
  },

  filters: {
    dateFormat(val, formatStr = 'MM-DD HH:mm') {
      return moment(val)
        .utcOffset(0)
        .format(formatStr)
    }
  },

  methods: {
    formatDate(val, formatStr = 'MM-DD HH:mm') {
      return moment(val)
        .utcOffset(0)
        .format(formatStr)
    }
  }
}
</script>

<style lang="scss" scoped>
.interview-card {
  cursor: pointer;
  padding: $gap;
  border-bottom: 1px solid #f1f1f1;
  transition: all 0.3s;
  &:hover {
    background-color: #f2f5fa;
  }
}
.interview-right {
  //   padding: $gap;
  .interview {
    &-header {
      display: flex;
      margin-bottom: $gap-xs;
      .header-title {
        font-weight: 400;
      }
      .right-text {
        margin-left: auto;
      }
    }
    &-body {
      margin-bottom: $gap-xs;
    }
    &-footer {
      .footer-content {
        font-size: 13px;
      }
    }
  }
}
</style>
