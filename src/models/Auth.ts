/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './User'

export interface Auth {
  loggedInUser: User | null
  connectedUsers: any
  login: (creds: {
    username: string
    password: string
  }) => Promise<User | undefined>
  LoginAsGuest: () => Promise<void>
  signUp: (creds: {
    username: string
    password: string
    fullname: string
  }) => Promise<User | undefined>
  logout: () => Promise<void>
  setConnectedUsers: any
}
