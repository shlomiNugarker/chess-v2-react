// MyContext.js
import { createContext, useContext, useState } from 'react'
import { Auth } from '../models/Auth'
import { User } from '../models/User'
import { authService } from '../services/authService'
import { socketService } from '../services/socketService'

const AuthContext = createContext<Auth | null>(null)

export const useAuthContext = () => useContext(AuthContext)

type Props = {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(
    authService.getLoggedinUser()
  )
  const [connectedUsers, setConnectedUsers] = useState<string[]>([])

  const login = async (userCred: { username: string; password: string }) => {
    const user = await authService.login(userCred)
    socketService.emit('setUserSocket', user?._id)
    if (user) setLoggedInUser(user)
    return user
  }

  const logout = async () => {
    await authService.logout()
    setLoggedInUser(null)
    const user = authService.getLoggedinUser()
    user && socketService.emit('user-disconnect', user._id)
  }
  const signUp = async (userCred: {
    username: string
    password: string
    fullname: string
  }) => {
    const user = await authService.signup(userCred)
    setLoggedInUser(user)
    const savedUser = authService.getLoggedinUser()
    user && socketService.emit('user-disconnect', savedUser?._id)
    return user
  }

  const LoginAsGuest = async () => {
    const name = prompt('Enter your name:')
    if (!name?.trim()) return
    const newUser = await authService.signupAsGuest(name)
    setLoggedInUser(newUser)
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        LoginAsGuest,
        login,
        logout,
        signUp,
        connectedUsers,
        setConnectedUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
