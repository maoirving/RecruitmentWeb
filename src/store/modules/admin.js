import { getToken, setToken, removeToken } from '@/utils/auth'
import axios from 'axios'

const getDefaultState = () => {
  return {
    token: getToken('adminToken'),
    avatar: '',
    role: ''
  }
}

const state = getDefaultState

const getters = {
  isAuthenticated: state => !!state.token,
  isSuperAdmin: state => state.role === 'admin'
}

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, type } = userInfo
    return new Promise((resolve, reject) => {
      axios
        .post('/users/check', {
          username: username.trim(),
          password: password,
          type: type
        })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.user.token)
          setToken('adminToken', data.user.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getAdminInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/info`)
        .then(({ data }) => {
          commit('SET_AVATAR', data.user.imageUrl)
          commit('SET_ROLE', data.user.type)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken('adminToken') // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
