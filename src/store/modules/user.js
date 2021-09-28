import { getUserId, getToken, setUserId, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'

const getDefaultState = () => {
  return {
    token: getToken(),
    id: getUserId(),
    name: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
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
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      axios
        .post('/users/check', { username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          console.log(response)
          commit('SET_TOKEN', data.user.token)
          commit('SET_ID', data.user.id)
          commit('SET_NAME', data.user.username)
          setUserId(data.user.id)
          setToken(data.user.token, 200000)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response

          if (!data) {
            return reject('Verification failed, please Login again.')
          }

          if (data.isSuper) {
            data.dmsRoles = [{ isSuper: 1 }]
          }
          data.dmsRoles.forEach(o => {
            if (o.permissions) {
              o.permissions = o.permissions.split(',')
            }
          })

          commit('SET_ROLES', data.dmsRoles)
          commit('SET_NAME', data.name)
          commit(
            'SET_AVATAR',
            data.avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          )
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
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
