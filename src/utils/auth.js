import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getUserId() {
  return Cookies.get('userId')
}
export function setUserId(id) {
  return Cookies.set('userId', id)
}

export function getAdminId() {
  return Cookies.get('adminId')
}
export function setAdminId(id) {
  return Cookies.set('adminId', id)
}

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token, expires) {
  return Cookies.set(TokenKey, token, { expires })
}

export function getAdminToken() {
  return Cookies.get('adminToken')
}
export function setAdminToken(token, expires) {
  return Cookies.set('adminToken', token, { expires })
}

export function removeToken() {
  Cookies.remove('userId')
  return Cookies.remove(TokenKey)
}

export function isSuperManagement(role) {
  // return role && role.isSuper // && role.name.toLowerCase() === 'admin'
  return (role && role.isSuper) || (role && role.name.toLowerCase() === 'admin')
}
