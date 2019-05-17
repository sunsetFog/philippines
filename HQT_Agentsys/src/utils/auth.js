import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'
const TokenKey = 'token-header'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const username = 'username'

export function getname() {
  return Cookies.get(username)
}

export function setname(name) {
  return Cookies.set(username, name)
}

export function removename() {
  return Cookies.remove(username)
}
