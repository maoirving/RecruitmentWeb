<template>
  <div v-if="(filterItems && filterItems.length) || (visibleButtons && visibleButtons.length)">
    <el-row class="operate-container">
      <el-col v-if="visibleButtons.length" :span="buttonWrapper">
        <el-row :gutter="24">
          <el-col
            v-for="(item, index) in visibleButtons"
            :key="index"
            :span="item.span || 2"
            class="operate-item-button"
          >
            <el-dropdown v-if="item.children && item.children.length" @command="onActionCommand">
              <el-button v-bind="actionAttrs(item)">
                {{ item.label }}
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="child in item.children" :key="child.key" :command="child">
                  {{ child.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button v-else v-bind="actionAttrs(item)" v-on="actionEvents(item)">
              <component :is="item.slot" v-if="item.slot" />
              <template v-else>
                {{ item.label }}
              </template>
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="filterOptionWrapper" class="filter-option-wrapper">
        <el-row type="flex" justify="end" :gutter="24" class="wrap">
          <el-col v-for="(item, i) in filterItems" :key="i" :span="item.span">
            <!-- <el-col v-for="(item, i) in filterItems" :key="i" :span="item.span" class="operate-primary-area"> -->
            <el-input
              v-if="!item.component || !item.component.control"
              v-model="criteria[item.key]"
              class="search-input placeholder-none-text operate-item-input"
              v-bind="item.attrs"
              prefix-icon="el-icon-search"
              v-on="componentEvents(item)"
              @change="changeCriteria($event, item.key)"
              @keydown.enter="onSearch"
            />
            <component
              :is="item.component.control"
              v-else
              v-model="criteria[item.key]"
              :value="criteria[item.key]"
              v-bind="componentAttrs(item)"
              class="operate-item"
              @change="changeCriteria($event, item.key)"
              v-on="componentEvents(item)"
            >
              <template v-if="item.component.slot">{{ item.component.slot }}</template>
            </component>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="ns-space--small" />
  </div>
</template>

<script>
import { cloneDeep, omit } from 'lodash'
import EventMixin from '@/utils/event-mixin'

export default {
  name: 'TableBaseTableSearch',
  components: {},
  mixins: [EventMixin],
  props: {
    filterItems: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    },
    defaultCriteria: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      criteria: this.initCriteria(this.defaultCriteria)
    }
  },
  computed: {
    visibleButtons() {
      return this.buttons.filter(it => this.buttonVisible(it))
    },
    buttonWrapper() {
      let num = 0
      switch (this.visibleButtons.length) {
        case 0:
          num = 0
          break
        case 1:
          num = 4
          break
        case 2:
          num = 6
          break
        case 3:
          num = 8
          break
        case 4:
          num = 8
          break
        default:
          num = 24
          break
      }
      return num
    },
    filterOptionWrapper() {
      let num = 24
      switch (this.visibleButtons.length) {
        case 0:
          num = 24
          break
        case 1:
          num = 20
          break
        case 2:
          num = 16
          break
        case 3:
          num = 14
          break
        case 4:
          num = 16
          break
        default:
          num = 24
          break
      }
      return num
    }
  },
  watch: {
    defaultCriteria: {
      handler(value) {
        this.criteria = this.initCriteria(value)
      },
      deep: true
    }
  },
  methods: {
    initCriteria(defaultCriteria) {
      const criteria = {}
      const query = Object.assign({}, defaultCriteria, this.$route.query)
      this.filterItems.forEach(it => {
        criteria[it.key] = query[it.key] || ''
      })
      return criteria
    },
    clearCriteria() {
      for (const key in this.criteria) {
        this.criteria[key] = ''
      }
      this.onSearch()
    },
    componentAttrs(item) {
      const attrs = item && item.component && item.component.attrs
      return this.bindAttrs(attrs, item, item)
    },
    componentEvents(item) {
      const events = item.component && item.component.events
      if (!events) {
        return {
          change: this.onSearch
        }
      }
      const eventCombined = Object.assign(
        {},
        {
          change: this.onSearch
        },
        events
      )
      return this.bindEvents(eventCombined, item, this.criteria)
    },
    onSearch() {
      this.$emit('search', cloneDeep(this.criteria))
    },
    changeCriteria(value, key) {
      this.criteria[key] = value
    },
    actionAttrs(item) {
      const attrs = omit(item, ['attrs', 'events', 'visibleOnSelection', 'label', 'slot'])
      const finalAttrs = Object.assign(
        {
          type: 'primary',
          size: 'small'
        },
        attrs,
        item.attrs
      )
      return this.bindAttrs(finalAttrs, item, item)
    },
    actionEvents(item) {
      const actionEvents = item && item.events
      return this.bindEvents(actionEvents, item, item)
    },
    onActionCommand(item) {
      const { click } = this.actionEvents(item)
      if (click && typeof click === 'function') {
        click()
      }
    },
    buttonVisible(item) {
      if (!item || !item.visibleOnSelection || typeof item.visibleOnSelection !== 'function') {
        return true
      }
      return item.visibleOnSelection(this.selected)
    },
    reload() {
      this.$emit('reload')
    }
  }
}
</script>

<style lang="scss" scoped>
.operate-container {
  display: flex;
  align-items: center;
}
::v-deep .el-date-editor {
  &--daterange,
  &--datetimerange {
    display: flex !important;
    align-items: center;
    height: 36px;
    line-height: 0;
    .el-range__icon,
    .el-range-separator {
      line-height: 28px;
    }
  }
}
::v-deep .filter-option-wrapper {
  .wrap {
    flex-wrap: wrap;
    .el-col {
      margin: 4px 0;
    }
  }
}
</style>
