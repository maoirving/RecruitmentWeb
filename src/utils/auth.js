import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getUserId() {
  return Cookies.get('userId')
}
export function setUserId(id) {
  return Cookies.set('userId', id)
}

export function getUsername() {
  return Cookies.get('username')
}
export function setUsername(username) {
  return Cookies.set('username', username)
}

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token, expires) {
  return Cookies.set(TokenKey, token, { expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function isSuperManagement(role) {
  // return role && role.isSuper // && role.name.toLowerCase() === 'admin'
  return (role && role.isSuper) || (role && role.name.toLowerCase() === 'admin')
}
