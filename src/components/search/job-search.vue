<template>
  <div class="search-wrapper">
    <div class="input-btn-holder">
      <el-input class="search-input" placeholder="请输入职位名称" v-model="searchForm.name">
      </el-input>
      <el-button
        class="search-btn"
        type="primary"
        icon="el-icon-search"
        @click="searchJobs(searchForm.name)"
      >
        搜索
      </el-button>
    </div>

    <el-form class="filter-list" :inline="true" :model="searchForm">
      <el-form-item class="filter-list-item" v-for="(filter, index) in filters" :key="index">
        <el-select
          size="small"
          v-model="searchForm[filter.prop]"
          :placeholder="filter.name"
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
  data() {
    return {
      searchForm: {
        name: '',
        type: '',
        education: '',
        experience: '',
        financingStage: '',
        staffCount: ''
      },
      filters: [
        {
          name: '招聘类型',
          prop: 'type',
          options: [
            {
              label: '不限',
              value: 'all'
            },
            {
              label: '校园招聘',
              value: 'school'
            },
            {
              label: '社会招聘',
              value: 'society'
            }
          ]
        },
        {
          name: '学历要求',
          prop: 'education',
          options: [
            {
              label: '不限',
              value: 'all'
            },
            {
              label: '大专',
              value: '大专'
            },
            {
              label: '本科',
              value: '大专'
            },
            {
              label: '硕士',
              value: '大专'
            },
            {
              label: '博士',
              value: '大专'
            }
          ]
        },
        {
          name: '工作经验',
          prop: 'experience',
          options: [
            {
              label: '不限',
              value: 'all'
            },
            {
              label: '1年以内',
              value: '1年以内'
            },
            {
              label: '1~3年',
              value: '1~3年'
            },
            {
              label: '3~5年',
              value: '3~5年'
            },
            {
              label: '5~10年',
              value: '5~10年'
            }
          ]
        },
        {
          name: '融资阶段',
          prop: 'financingStage',
          options: [
            {
              label: '不限',
              value: 'all'
            },
            {
              label: '未融资',
              value: '未融资'
            },
            {
              label: '天使轮',
              value: '大天使轮专'
            },
            {
              label: 'A轮',
              value: 'A轮'
            },
            {
              label: 'B轮',
              value: 'B轮'
            },
            {
              label: 'C轮',
              value: 'C轮'
            },
            {
              label: 'D轮及以上',
              value: 'D轮及以上'
            },
            {
              label: '已上市',
              value: '已上市'
            },
            {
              label: '不需要融资',
              value: '不需要融资'
            }
          ]
        },
        {
          name: '公司规模',
          prop: 'staffCount',
          options: [
            {
              label: '不限',
              value: 'all'
            },
            {
              label: '0-20人',
              value: '0-20人'
            },
            {
              label: '20-99人',
              value: '20-99人'
            },
            {
              label: '100-499人',
              value: '100-499人'
            },
            {
              label: '500-999人',
              value: '500-999人'
            },
            {
              label: '1000-9999人',
              value: '1000-9999人'
            },
            {
              label: '10000人以上',
              value: '10000人以上'
            }
          ]
        }
      ]
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
