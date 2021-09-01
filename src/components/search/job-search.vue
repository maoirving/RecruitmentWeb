<template>
  <div class="search-wrapper">
    <el-input class="mb-2" placeholder="搜索职位" v-model="input3">
      <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-row>
        <el-col :span="5" v-for="(filter, index) in filters" :key="index">
          <el-form-item>
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
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        jobType: '',
        education: '',
        financingStage: ''
      },
      filters: [
        {
          name: '招聘类型',
          prop: 'jobType',
          options: [
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
          name: '融资阶段',
          prop: 'financingStage',
          options: [
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
        }
      ]
    }
  }
}
</script>

<style></style>
