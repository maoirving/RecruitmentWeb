<template>
  <div v-if="(filterItems && filterItems.length) || (buttons && buttons.length)">
    <el-row type="flex" align="middle">
      <el-col v-if="buttons.length" :span="5">
        <el-row type="flex" :gutter="10">
          <el-col v-for="(item, index) in buttons" :key="index" :span="item.span">
            <el-button v-bind="actionAttrs(item.attrs)" v-on="actionEvents(item)">
              {{ item.label }}
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="19" class="ml-auto">
        <el-row type="flex" justify="end" :gutter="10" class="wrap">
          <el-col v-for="(item, i) in filterItems" :key="i" :span="item.span">
            <el-input
              v-if="!item.isSelect"
              v-model="filterParams[item.key]"
              v-bind="item.attrs"
              prefix-icon="el-icon-search"
              @change="changeFilter($event, item.key)"
              @keydown.enter="onSearch"
            />
            <el-select
              v-else
              v-model="filterParams[item.key]"
              v-bind="item.attrs"
              @change="changeFilter($event, item.key)"
            >
              <el-option
                v-for="(option, i) in item.options"
                :key="i"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
    }
  },

  data() {
    return {
      filterParams: this.initParams()
    }
  },

  methods: {
    initParams() {
      const params = {}
      this.filterItems.forEach(item => {
        params[item.key] = ''
      })
      return params
    },
    changeFilter(value, key) {
      this.filterParams[key] = value
      this.$emit('search', cloneDeep(this.filterParams))
    },
    actionAttrs(attrs) {
      const newAttrs = Object.assign(
        {
          type: 'primary',
          size: 'small'
        },
        attrs
      )
      return newAttrs
    },
    actionEvents(item) {
      const actionEvents = item && item.events
      return this.bindEvents(actionEvents, item, item)
    }
  }
}
</script>
