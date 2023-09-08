import { ChatState } from './ChatState'

export type SaveChat = (
  chat: ChatState,
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
) => Promise<ChatState>
