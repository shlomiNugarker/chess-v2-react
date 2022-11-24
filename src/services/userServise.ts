import { User } from '../models/User'
import { httpService } from './httpService'

export const userService = {
  getUser,
  saveUser,
}

async function getUser(userId: string): Promise<User> {
  const user = await httpService.get('user/' + userId)
  return user
}

async function saveUser(userToSave: User): Promise<User> {
  const savedUser = userToSave._id
    ? await httpService.put(`user/` + userToSave._id, userToSave)
    : await httpService.post(`user`, userToSave)

  return savedUser
}
