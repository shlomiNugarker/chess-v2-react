import { GameState } from '../../../models/GameState'
import { User } from '../../../models/User'

export const isValidPlayerTurn = (
  gameState: GameState,
  isTwoPlayerInTheGame: boolean,
  loggedInUser: User | null | undefined
) => {
  if (!gameState?.isOnline) return true
  if (gameState?.isOnline && isTwoPlayerInTheGame) {
    if (
      gameState.isBlackTurn &&
      loggedInUser?._id === gameState.players?.black
    ) {
      return true
    } else if (
      !gameState.isBlackTurn &&
      loggedInUser?._id === gameState.players?.white
    ) {
      return true
    }
  }
  return false
}
