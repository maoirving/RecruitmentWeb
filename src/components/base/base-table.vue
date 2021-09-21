<template>
  <div class="base-table">
    <base-search-bar
      class="base-search-bar"
      ref="search"
      :filter-items="filterItems"
      :buttons="buttons"
      :default-criteria="criteria"
      :selected="selected"
      @search="search"
      @reload="reload"
    />
    <el-table
      ref="table"
      v-loading="loading"
      :max-height="maxHeight"
      :data="tableData"
      :row-key="tree ? 'id' : undefined"
      :stripe="isStripe"
      border
      :default-expand-all="isExpansile"
      v-bind="$attrs"
      @select="selectCheckbox"
      @select-all="selectAllCheckbox"
      @selection-change="selectionChange"
      v-on="$listeners"
    >
      <template v-for="(column, i) in columns">
        <template v-if="!column.slot">
          <el-table-column v-if="!column.component" :key="i" v-bind="columnAttrs(column)" />
          <el-table-column v-else :key="i" v-bind="columnAttrs(column)">
            <template slot-scope="scope">
              <template v-if="column.component.attrs && column.component.attrs.value !== undefined">
                <component
                  :is="column.component.control"
                  v-bind="componentAttrs(column, scope)"
                  :columns="columns"
                  v-on="componentEvents(column, scope)"
                >
                  <template v-if="column.component.slot">{{
                    item[column.component.slot]
                  }}</template>
                </component>
              </template>
              <component
                :is="column.component.control"
                v-else
                v-model="scope.row[column.prop]"
                v-bind="componentAttrs(column, scope)"
                :columns="columns"
                v-on="componentEvents(column, scope)"
              >
                <template v-if="column.component.slot">{{ item[column.component.slot] }}</template>
              </component>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-else :key="i" v-bind="columnAttrs(column)">
          <slot
            :name="column.slot"
            v-bind="slotAttrs(column, i)"
            v-on="componentEvents(column, items[i])"
          />
        </el-table-column>
      </template>

      <el-table-column
        align="center"
        label="操作"
        fixed="right"
        :width="operationWidth || actionsLength"
      >
        <template slot-scope="scope">
          <template v-for="(action, i) in getVisibleActions(scope)">
            <el-button
              :key="i"
              v-bind="actionAttrs(action, scope)"
              v-on="actionEvents(action, scope)"
            >
              <ns-icon v-if="action.icon" :type="action.icon" />
              {{ action.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <base-pagination
      v-if="pageInfo.total"
      :total="pageInfo.total"
      :page.sync="pageInfo.page"
      :limit.sync="pageInfo.pageSize"
      @pagination="pageChanged"
    />
  </div>
</template>

<script>
import { cloneDeep, omit, omitBy, pick } from 'lodash'
import actionMixin from '@/utils/event-mixin'
import BaseSearchBar from '@/components/base/base-search-bar'
import BasePagination from '@/components/base/base-pagination'

export default {
  components: {
    BaseSearchBar,
    BasePagination
  },

  mixins: [actionMixin],

  props: {
    tree: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => undefined
    },
    actions: {
      type: Array,
      default: () => []
    },
    operationWidth: {
      type: [Number, String],
      default: null
    },
    fetchData: {
      type: Function,
      default: undefined
    },
    filterItems: {
      type: Array,
      default: () => []
    },
    totalItems: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    buttons: {
      type: Array,
      default: () => []
    },
    isStripe: {
      type: Boolean,
      default: true
    },
    isSub: {
      type: Boolean,
      default: false
    },
    syncParamsToQuery: {
      type: Boolean,
      default: true
    },
    criteria: {
      type: Object,
      default() {
        return {}
      }
    },
    isExpansile: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      items: [],
      query: {},
      pageInfo: {
        total: 0,
        page: 1,
        pageSize: 10
      },
      selected: []
    }
  },

  watch: {
    tableData: {
      handler(newVal) {
        this.$emit('table-data', newVal)
      },
      deep: true
    }
  },

  computed: {
    actionsLength() {
      return this.actions.length > 2 ? '280px' : '180px'
    },
    tableData() {
      return this.data || this.items
    }
  },

  methods: {
    getVisibleActions(scope) {
      return this.actions
        .filter(action => {
          return action.visible ? action.visible(scope) : true
        })
        .map(it => this.bindAttrs(it, scope, scope))
    },

    reload() {
      this.queryData({})
    },
    pageChanged({ page, limit }) {
      this.queryData({
        page,
        pageSize: limit
      })
    },
    queryData(criteria) {
      const params = omitBy(Object.assign({}, this.$route.query, criteria), value => value === '')
      if (this.fetchData) {
        this.loading = true

        this.fetchData(params)
          .then(({ data: { list = [], total = 0 } }) => {
            this.items = list
            this.pageInfo.total = total
            if (this.syncParamsToQuery && !this.isSub) {
              const query = Object.assign({}, params, pick(this.pageInfo, ['page', 'pageSize']))
              this.$router.replace({
                query: omitBy(query, value => value === '')
              })
            }
            this.loading = false
          })
          .catch(error => {
            this.$message.error({ message: error })
            this.loading = false
          })
      }
      this.$emit('query-data', criteria)
    },
    search(criteria) {
      this.queryData(criteria)
      this.$emit('search', criteria)
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
    selectCheckbox(selection, row) {
      const isSelected = selection.length && selection.indexOf(row) !== -1
      this.$emit('judge-select', isSelected, row)
    },
    selectAllCheckbox(selection) {
      this.$emit('judge-selectAll', selection)
    },
    selectionChange(selected) {
      this.selected = selected
      this.$emit('judge-selection-change', selected)
    },

    toggleRowSelection(row, bool) {
      const vm = this
      this.$nextTick(() => {
        vm.$refs.table.toggleRowSelection(vm.tableData[row], bool)
      })
    },
    onActionCommand(action, scope) {
      const { click } = this.actionEvents(action, scope)
      if (click && typeof click === 'function') {
        click() // 调用this.actionEvents时已经绑定了上下文以及参数信息，这里直接调用即可
      }
    }
  },

  created() {
    const { page, pageSize } = this.$route.query
    this.pageInfo.page = +(page || '1')
    this.pageInfo.pageSize = +(pageSize || '10')
    if (this.syncParamsToQuery && !this.isSub && this.$route.query.page === undefined) {
      this.$router.replace({ query: { ...this.$route.query, page: 1, pageSize: 10 } })
    }
    const criteria = Object.assign({}, this.$route.query)
    this.queryData(criteria)
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  .base-search-bar {
    margin-bottom: $gap-lg;
  }
  .pagination-wrapper {
    text-align: center;
    padding: $gap-lg 0 $gap-xs;
  }
}
</style>
