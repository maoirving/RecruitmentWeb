import axios from 'axios'

// common
export const whetherOptions = [
  {
    label: '是',
    value: true
  },
  {
    label: '否',
    value: false
  }
]

// job
export const getJobOptions = async () => {
  const { data } = await axios.get('/jobs/options')
  return data && data.options
}

export const jobTypeOptions = [
  {
    label: '校园招聘',
    value: 'school'
  },
  {
    label: '社会招聘',
    value: 'society'
  }
]

export const educationBackgroundOptions = [
  {
    label: '不限',
    value: '不限'
  },
  {
    label: '大专',
    value: '大专'
  },
  {
    label: '本科',
    value: '本科'
  },
  {
    label: '硕士',
    value: '硕士'
  },
  {
    label: '博士',
    value: '博士'
  }
]

export const workExperienceOptions = [
  {
    label: '不限',
    value: '不限'
  },
  {
    label: '1年以内',
    value: '1年以内'
  },
  {
    label: '1-3年',
    value: '1-3年'
  },
  {
    label: '3-5年',
    value: '3-5年'
  },
  {
    label: '5-10年',
    value: '5-10年'
  }
]
// company
export const companyTypeOptions = [
  {
    label: '电子商务',
    value: '电子商务'
  },
  {
    label: '游戏',
    value: '游戏'
  },
  {
    label: '媒体',
    value: '媒体'
  },
  {
    label: '互联网',
    value: '互联网'
  },
  {
    label: '计算机软件',
    value: '计算机软件'
  },
  {
    label: '其他',
    value: '其他'
  }
]

export const financingStageOptions = [
  {
    label: '未融资',
    value: '未融资'
  },
  {
    label: '天使轮',
    value: '天使轮'
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

export const scaleOptions = [
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

// user

export const getUserOptions = async () => {
  const { data } = await axios.get('/users/options')
  return data && data.options
}

export const userTypeOptions = [
  {
    label: '个人用户',
    value: 'worker'
  },
  {
    label: '企业用户',
    value: 'recruiter'
  },
  {
    label: '管理员',
    value: 'admin'
  }
]

export const sexOptions = [
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  }
]

export const registerTypeOptions = [
  {
    label: '我要找工作',
    value: 'worker'
  },
  {
    label: '我要招聘',
    value: 'recruiter'
  }
]

// application
export const getApplicatonIdOptions = async () => {
  const { data } = await axios.get('/applications/ids')
  return data && data.options
}

export const handledStatusOptions = [
  {
    label: '未处理',
    value: 0
  },
  {
    label: '通过初筛',
    value: 1
  },
  {
    label: '不合适',
    value: -1
  }
]

export const applicationHandleOptions = [
  {
    label: '通过初筛',
    value: 1
  },
  {
    label: '标为不合适',
    value: -1
  }
]
