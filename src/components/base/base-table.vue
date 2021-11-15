<template>
  <div class="base-table">
    <base-table-search
      class="base-table-search"
      ref="search"
      :filter-items="filterItems"
      :buttons="buttons"
      :default-criteria="criteria"
      :selectedArr="selectedArr"
      @search="handleSearch"
    />
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      v-bind="$attrs"
      @selection-change="selectionChange"
      v-on="$listeners"
    >
      <template v-for="(column, i) in visibleColumns">
        <template v-if="!column.slot">
          <el-table-column
            v-if="!column.component"
            :key="i"
            v-bind="columnAttrs(column)"
          />
          <el-table-column v-else :key="i" v-bind="columnAttrs(column)">
            <template slot-scope="scope">
              <component
                :is="column.component.control"
                v-model="scope.row[column.prop]"
                v-bind="componentAttrs(column, scope)"
                :columns="columns"
                v-on="componentEvents(column, scope)"
              >
                <template v-if="column.component.slot">{{
                  item[column.component.slot]
                }}</template>
              </component>
            </template>
          </el-table-column>
        </template>
      </template>

      <el-table-column
        align="center"
        label="操作"
        fixed="right"
        :width="columnWidth"
      >
        <template slot-scope="scope">
          <template v-for="(action, i) in getVisibleActions(scope)">
            <el-button
              :key="i"
              v-bind="actionAttrs(action, scope)"
              v-on="actionEvents(action, scope)"
            >
              {{ action.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <base-pagination :page-info="pageInfo" @pagination="reload" />
  </div>
</template>

<script>
import { cloneDeep, omit, omitBy, pick } from 'lodash'
import actionMixin from '@/utils/event-mixin'
import BaseTableSearch from '@/components/base/base-table-search'
import BasePagination from '@/components/base/base-pagination'
import BaseTag from '@/components/base/base-tag'

export default {
  components: {
    BaseTableSearch,
    BasePagination,
    BaseTag
  },

  mixins: [actionMixin],

  props: {
    columns: {
      type: Array,
      required: true
    },
    extraActions: {
      type: Array,
      default: () => []
    },
    defaultActions: {
      type: Array,
      default: () => {
        return ['edit', 'delete']
      }
    },
    filterItems: {
      type: Array,
      default: () => []
    },
    defaultButtons: {
      type: Array,
      default: () => ['add', 'deleteMany']
    },
    criteria: {
      type: Object,
      default() {
        return {}
      }
    },
    fetchData: {
      type: Function,
      default: undefined
    }
  },

  data() {
    return {
      tableData: [],
      loading: false,
      items: [],
      query: {},
      pageInfo: {
        currentPage: 1,
        limit: 10,
        total: 0
      },
      filterParams: {},
      selectedArr: [],
      routeMap: {
        JobManagement: {
          text: '职位',
          key: 'jobs'
        },
        CompanyManagement: {
          text: '公司',
          key: 'companies'
        },
        ApplicationManagement: {
          text: '申请',
          key: 'applications'
        },
        InterviewManagement: {
          text: '面试',
          key: 'interviews'
        },
        UserManagement: {
          text: '用户',
          key: 'users'
        }
      }
    }
  },

  computed: {
    columnWidth() {
      return this.extraActions.length ? '260px' : '180px'
    },
    visibleColumns() {
      return this.columns.filter(item => !!item.hide === false)
    },
    routeText() {
      return this.routeMap[this.$route.name].text
    },
    routeKey() {
      return this.routeMap[this.$route.name].key
    },
    buttons() {
      const vm = this
      const newButtons = []
      this.defaultButtons.forEach(button => {
        if (button === 'add') {
          newButtons.push({
            label: `新增${this.routeText}`,
            span: 10,
            events: {
              click() {
                vm.$emit('add', vm)
              }
            }
          })
        }
        if (button === 'deleteMany') {
          if (this.columns[0].type !== 'selection') {
            this.columns.unshift({
              width: '40px',
              type: 'selection',
              label: ''
            })
          }

          newButtons.push({
            label: `批量删除`,
            span: 10,
            events: {
              click() {
                if (vm.selectedArr && vm.selectedArr.length) {
                  vm.$confirm('确认批量删除选中项？', { type: 'warning' })
                    .then(() => {
                      const postedArr = vm.selectedArr.filter(
                        item => item.status === 1
                      )
                      if (postedArr.length) {
                        return vm.$message.warning(
                          `${postedArr.length}条已发布的数据不能删除，请重新选择`
                        )
                      }
                      const result = vm.selectedArr.every(async item => {
                        const res = await vm.$axios.delete(
                          `/${vm.routeKey}/${item.id}`
                        )
                        return res.data.success
                      })
                      if (!result) {
                        return vm.$message.error('批量删除失败')
                      }
                      vm.$message.success('批量删除成功')
                      vm.reload()
                    })
                    .catch(() => {})
                } else {
                  vm.$message.warning('请先勾选要删除的数据')
                }
              }
            }
          })
        }
      })
      return newButtons
    }
  },

  methods: {
    getVisibleActions(scope) {
      let newActions = this.extraActions
        .filter(action => {
          return action.visible ? action.visible(scope) : true
        })
        .map(it => this.bindAttrs(it, scope, scope))

      this.defaultActions.forEach(action => {
        if (action === 'edit') {
          newActions.unshift({
            label: scope.row.status ? '查看' : '编辑',
            type: 'primary',
            events: {
              click({ row }) {
                this.$emit('edit', this, row)
              }
            }
          })
        }
        if (action === 'delete') {
          newActions.push({
            label: '删除',
            type: 'danger',
            disabled: !!scope.row.status,
            events: {
              click({ row }) {
                this.$confirm(`确认删除该${this.routeText}？`, {
                  type: 'warning'
                })
                  .then(async () => {
                    const res = await this.$axios.delete(
                      `/${this.routeKey}/${row.id}`
                    )
                    if (!res.data.success) {
                      return this.$message.error('删除失败')
                    }
                    this.$message.success('删除成功')
                    this.reload()
                  })
                  .catch(() => {})
              }
            }
          })
        }
      })

      return newActions
    },
    reload() {
      const params = omitBy(
        Object.assign(this.pageInfo, this.filterParams),
        val => val === ''
      )
      this.loading = true
      setTimeout(async () => {
        const res = await this.fetchData(params)
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.loading = false
      }, 500)
    },
    handleSearch(params) {
      this.filterParams = params
      this.reload()
    },
    actionAttrs(action, scope) {
      const attrs = Object.assign(
        {
          size: 'small',
          type: 'primary'
        },
        omit(action, 'events', 'attrs', 'children'),
        action.attrs
      )
      return this.bindAttrs(attrs, scope, action)
    },
    actionEvents(action, scope) {
      if (!action || !scope || !action.events) {
        return {}
      }
      const ctx = {
        $index: scope['$index'],
        column: scope['column'],
        row: scope['row']
      }
      return this.bindEvents(action.events, scope, ctx)
    },
    columnAttrs(column) {
      const attrs = Object.assign(
        {
          align: 'center'
        },
        omit(column, 'component')
      )
      return this.bindAttrs(attrs, {}, column)
    },
    slotAttrs(column, rowIndex) {
      const attrs = {
        column,
        rowIndex,
        row: this.items[rowIndex],
        columns: this.columns
      }
      return cloneDeep(attrs)
    },
    componentAttrs(column, scope) {
      if (!column.component || !column.component.attrs) {
        return {}
      }
      const attrs = {}
      for (const key in column.component.attrs) {
        const value = column.component.attrs[key]
        if (typeof value === 'function') {
          attrs[key] = value(scope)
        } else {
          attrs[key] = value
        }
      }
      attrs['ctx'] = scope

      return attrs
    },
    componentEvents(column, scope) {
      const actionEvents = column.component && column.component.events
      return this.bindEvents(actionEvents, scope, column)
    },
    selectionChange(selectedArr) {
      this.selectedArr = selectedArr
    },
    onActionCommand(action, scope) {
      const { click } = this.actionEvents(action, scope)
      if (click && typeof click === 'function') {
        click() // 调用this.actionEvents时已经绑定了上下文以及参数信息，这里直接调用即可
      }
    }
  },

  created() {
    this.columns.unshift({
      width: '100px',
      label: 'id',
      prop: 'id'
    })
  },

  mounted() {
    this.reload()
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  .base-table-search {
    margin-bottom: $gap-lg;
  }
  .pagination-wrapper {
    text-align: center;
    padding: $gap-lg 0 $gap-xs;
  }
}
</style>
