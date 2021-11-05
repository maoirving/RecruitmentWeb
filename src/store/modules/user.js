import { getToken, getAdminToken, setToken, setAdminToken, removeToken } from '@/utils/auth'
import axios from 'axios'

const getDefaultState = () => {
  return {
    token: getToken(),
    adminToken: getAdminToken(),
    username: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState

const getters = {
  isAuthenticated: state => !!state.token,
  isAdmin: state => state.role === 'admin'
}

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, type } = userInfo
    return new Promise((resolve, reject) => {
      axios
        .post('/users/check', { username: username.trim(), password: password, type: type })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.user.token)
          if (type !== 'worker') {
            setAdminToken(data.user.token, 200000)
          } else {
            setToken(data.user.token, 200000)
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/info`)
        .then(({ data }) => {
          commit('SET_NAME', data.user.username)
          commit('SET_AVATAR', data.user.imageUrl)
          commit('SET_ROLES', data.user.type)
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
      removeToken() // must remove  token  first
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
