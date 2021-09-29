<template>
  <el-dialog
    class="awesome-scrollbar pdf-dialog"
    title="查看附件简历"
    width="60%"
    top="2vh"
    :center="true"
    v-bind="$attrs"
    :before-close="handleClose"
  >
    <div class="page-number-holder">共 {{ numPages }} 页</div>
    <div class="awesome-scrollbar pdf-wrapper">
      <div class="paper-wrapper" v-for="(i, k) in numPages" :key="k">
        <pdf :src="src" :page="i"></pdf>
        <div v-if="numPages > 1" class="page">第{{ i }}页</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Pdf from 'vue-pdf'

export default {
  components: {
    Pdf
  },

  data() {
    const loadingTask = Pdf.createLoadingTask(`${window.location.origin}/files/业务引导卡.pdf`)
    return {
      src: loadingTask,
      numPages: undefined,
      currentPage: 0,
      pageCount: 0,
      applicationId: ''
    }
  },

  computed: {},

  methods: {
    handleClose() {
      this.$emit('close-dialog', this.applicationId)
    }
  },

  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages
    })
  }
}
</script>

<style lang="scss" scoped>
.pdf-dialog {
  ::v-deep .el-dialog__body {
    padding-left: 20px;
    padding-right: 20px;
  }
  .page-number-holder {
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .pdf-wrapper {
    max-height: 80vh;
    padding: 5px;
    .paper-wrapper {
      margin-bottom: 16px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      .page {
        text-align: right;
        padding-right: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
