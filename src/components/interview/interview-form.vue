<template>
  <base-form :form-items="formItems" :form-data="interview">
    <template slot="interviewDateTime">
      <el-col :span="12">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="interview.interviewDate"
          style="width: 100%;"
          :disabled="disabled"
        ></el-date-picker>
      </el-col>
      <el-col class="text-center" :span="2">-</el-col>
      <el-col :span="10">
        <el-time-select
          class="w-full"
          placeholder="起始时间"
          v-model="interview.interviewTime"
          :picker-options="{
            start: '09:00',
            step: '00:30',
            end: '18:00'
          }"
          :disabled="disabled"
        >
        </el-time-select>
      </el-col>
    </template>
  </base-form>
</template>

<script>
import BaseForm from '@/components/base/base-form'
import moment from 'moment'

export default {
  components: {
    BaseForm
  },

  props: {
    interview: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      formItems: [
        {
          label: '面试时间',
          slot: 'interviewDateTime'
        },
        {
          label: '面试地点',
          prop: 'address',
          control: {
            attrs: {
              disabled: this.disabled
            }
          }
        },
        {
          label: '备注',
          prop: 'tip',
          control: {
            attrs: {
              type: 'textarea',
              rows: 4,
              placeholder: '请输入内容（提示、面试准备等）...',
              disabled: this.disabled
            }
          }
        }
      ]
    }
  }
}
</script>
