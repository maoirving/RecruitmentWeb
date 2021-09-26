<template>
  <div class="base-search">
    <div class="input-btn-holder">
      <el-input class="search-input" placeholder="请输入职位名称" v-model="filterData.name">
      </el-input>
      <el-button
        class="search-btn"
        type="primary"
        icon="el-icon-search"
        @click="$emit('filter', filterData)"
      >
        搜索
      </el-button>
    </div>

    <el-form class="filter-list" :inline="true" :model="filterData">
      <el-form-item class="filter-list-item" v-for="(filter, index) in filterItems" :key="index">
        <el-select
          size="small"
          v-model="filterData[filter.prop]"
          :placeholder="filter.name"
          @change="$emit('filter', filterData)"
          clearable
        >
          <el-option
            v-for="(option, i) in filter.options"
            :key="i"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    filterData: {
      type: Object,
      default: () => {}
    },

    filterItems: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    searchJobs() {
      console.log('hello')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  .input-btn-holder {
    display: flex;
    margin-bottom: $gap;
    .search-input ::v-deep {
      .el-input__inner {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .search-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .filter-list {
    &-item {
      width: 130px;
      margin-bottom: $gap-sm;
    }
  }
}
</style>
