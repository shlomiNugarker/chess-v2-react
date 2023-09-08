import _ from 'lodash'
import { ChatState } from '../../../models/ChatState'
import { GameState } from '../../../models/GameState'
import { UpdateGameState } from '../../../models/UpdateGameState'
import { User } from '../../../models/User'

type Props = {
  gameState: GameState | null
  chatState: ChatState | null
  loggedInUser: User | null | undefined
  updateGameState: UpdateGameState
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  saveChat: (chat: ChatState) => Promise<ChatState>
}

export const joinPlayerToTheGame = ({
  gameState,
  chatState,
  loggedInUser,
  updateGameState,
  setGameState,
  saveChat,
}: Props) => {
  if (gameState?.players?.white && gameState?.players?.black === '') {
    const stateToUpdate = _.cloneDeep(gameState)
    const chatToUpdate = _.cloneDeep(chatState)

    if (stateToUpdate.players) {
      const userId = loggedInUser?._id
      if (gameState.players.white === userId) return
      if (!userId) return

      if (gameState.chatId && chatToUpdate && userId) {
        if (!chatToUpdate.userId2) chatToUpdate.userId2 = userId
        else if (!chatToUpdate.userId) chatToUpdate.userId = userId

        saveChat(chatToUpdate)
      }
      stateToUpdate.players.black = userId
    }
    updateGameState(stateToUpdate, setGameState)
    return stateToUpdate
  } else if (gameState?.players?.black && gameState?.players?.white === '') {
    const stateToUpdate = _.cloneDeep(gameState)
    if (stateToUpdate.players) {
      const userId = loggedInUser?._id

      if (gameState.players.black === userId) return
      if (!userId) return

      stateToUpdate.players.white = userId
    }
    updateGameState(stateToUpdate, setGameState)
    return stateToUpdate
  }
}
