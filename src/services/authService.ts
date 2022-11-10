import { httpService } from './httpService'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'chess_logged_in_user'

async function login(userCred: any) {
  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}

async function signup(userCred: any) {
  const user = await httpService.post('auth/signup', userCred)

  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)

  return await httpService.post('auth/logout')
}

function _saveLocalUser(user: any) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
