<template>
  <div class="pagination-container">
    <el-pagination
      :current-page.sync="pageInfo.currentPage"
      :page-size.sync="pageInfo.pageSize"
      :layout="layout"
      :pager-count="5"
      :total="pageInfo.total"
      background
      hide-on-single-page
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageInfo: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination')
      if (this.autoScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  text-align: center;
  padding: $gap-lg 0 $gap-xs;
}
</style>
