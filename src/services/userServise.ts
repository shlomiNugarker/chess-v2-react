import { User } from '../models/User'
import { httpService } from './httpService'

export const userService = {
  getUser,
  saveUser,
  setLocalUser,
}

const users: { [id: string]: User } = {}

async function getUser(userId: string): Promise<User> {
  if (users[userId]) return users[userId]

  const user = await httpService.get('user/' + userId)
  users[userId] = user
  return user
}

async function saveUser(userToSave: User): Promise<User> {
  const savedUser = userToSave._id
    ? await httpService.put(`user/` + userToSave._id, userToSave)
    : await httpService.post(`user`, userToSave)

  return savedUser
}
async function setLocalUser(userToSave: User): Promise<User> {
  const savedUser: User = await saveUser(userToSave)
  return savedUser
}
