import { User } from '../models/User'
import { httpService } from './httpService'
import { userService } from './userServise'
import { utilService } from './utilService'

export const authService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  signupAsGuest,
}

const STORAGE_KEY_LOGGEDIN_USER = 'chess_logged_in_user'

async function login(userCred: { username: string; password: string }) {
  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}

async function signupAsGuest(fullname?: string | null) {
  const userFromStorage: User | null = getLoggedinUser()
  if (userFromStorage) return userFromStorage

  const newUser = {
    fullname: fullname || 'Guest-' + utilService.makeId(5),
  }

  const savedUser: User = await userService.saveUser(newUser)

  _saveLocalUser(savedUser)
  // utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, savedUser)
  return savedUser
}

async function signup(userCred: {
  username: string
  password: string
  fullname: string
}) {
  const user = await httpService.post('auth/signup', userCred)

  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function _saveLocalUser(user: User) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  const loggedInUserSession: User | null = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  )
  const loggedInUserStorage: User | null = utilService.loadFromStorage(
    STORAGE_KEY_LOGGEDIN_USER
  )
  return loggedInUserSession || loggedInUserStorage || null
}
