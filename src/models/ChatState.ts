export interface ChatState {
  userId: string
  userId2: string | undefined
  messages: { fullname: string; txt: string; _id: string; userId: string }[]
  createdAt?: number
  _id?: string
}
