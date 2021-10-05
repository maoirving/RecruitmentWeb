<template>
  <el-upload
    class="base-upload"
    :show-file-list="false"
    :action="actionUrl"
    :on-success="onSuccess"
    :before-upload="onBeforeUpload"
    :accept="accept"
    v-bind="$attrs"
  >
    <img v-if="value" :src="value" class="base-upload__image" />
    <i v-else class="el-icon-plus base-upload__icon" />
    <p v-if="!value && tip" slot="tip" class="base-upload__tip">{{ tip }}</p>
  </el-upload>
</template>

<script>
// import { getUrl } from '@/api'
// import { getToken } from '@/utils/auth'

export default {
  name: 'BaseUpload',

  model: {
    prop: 'value',
    value: 'change'
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    limit: {
      type: Number,
      default: 1 * 1024 * 1024 // 1MB
    },
    tip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      actionUrl: 'http://127.0.0.1:3000/upload/image'
    }
  },
  computed: {},
  methods: {
    onBeforeUpload(file) {
      const isImage =
        /^image\/(jpeg|png|jpg|gif)$/.test(file.type) || /^video\/(mp4)$/.test(file.type)
      const limitSize = file.size <= this.limit
      if (!isImage) {
        this.$message.error('文件格式不正确!')
      } else if (!limitSize) {
        this.$message.error(`文件不能大于${Math.ceil(this.limit / 1024 / 1024)}MB!`)
      }
      return limitSize && isImage
    },
    onSuccess(res, file) {
      if (res.success) {
        this.$emit('change', res.data.url)
        this.$emit('update:value', res.data.url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$upload-size: 100px;
.base-upload {
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }

  &__image {
    width: $upload-size;
    height: $upload-size;
    display: block;
  }

  &__icon {
    font-size: 20px;
    color: #8c939d;
    width: $upload-size;
    height: $upload-size;
    line-height: $upload-size;
    text-align: center;
  }

  &__tip {
    font-size: 12px;
    line-height: 1.2;
    margin-top: 0;
  }
}
</style>
