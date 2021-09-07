/* eslint-disable spaced-comment */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { formatLabelKey } from './label'

const baseURL = process.env.VUE_APP_BASE_API
const mockBaseURL = process.env.VUE_APP_MOCK_BASE_API
// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }

    /// #if process.env.NODE_ENV === 'development'
    config.baseURL = baseURL
    /// #endif
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const contentType = response.headers['content-type']
    if (contentType.indexOf('json') === -1) {
      console.error(['not JSON response', response])
      return Promise.reject(response.data)
    }

    const res = response.data
    if (res.message) {
      const labelKey = formatLabelKey(res.message, res.data)
      Message({
        type: res.code === 20000 ? 'success' : 'error',
        duration: 5 * 1000
      })
    }

    // if the custom code is not 20000, it is judged as an error.

    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
