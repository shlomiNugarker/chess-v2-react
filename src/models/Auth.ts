/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './User'

export interface Auth {
  loggedInUser: User | null
  connectedUsers: string[]
  login: (userCred: {
    username: string
    password: string
  }) => Promise<User | undefined>
  LoginAsGuest: () => Promise<void>
  signUp: (userCred: {
    username: string
    password: string
    fullname: string
  }) => Promise<User>
  logout: () => Promise<void>
  setConnectedUsers: React.Dispatch<React.SetStateAction<string[]>>
}
