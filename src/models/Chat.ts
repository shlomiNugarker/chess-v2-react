export interface Chat {
  userId: string
  userId2: string | undefined
  messages: { fullname: string; txt: string; _id: string }[]
  createdAt?: number
  _id?: string
}
