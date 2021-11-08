import Cookies from 'js-cookie'

const defaultToken = 'token'

export function getToken(tokenName = defaultToken) {
  return Cookies.get(tokenName)
}
export function setToken(tokenName = defaultToken, token, expires = 200000) {
  return Cookies.set(tokenName, token, { expires })
}

export function removeToken(tokenName = defaultToken) {
  return Cookies.remove(tokenName)
}
