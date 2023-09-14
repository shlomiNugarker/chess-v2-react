import { User } from '../../../models/User'

type Props = {
  isOnlineGame: boolean
  isBlackTurn: boolean
  isTwoPlayerInTheGame: boolean
  loggedInUser: User | null | undefined
  blackPlayerID: string | undefined
  whitePlayerID: string | undefined
}

export const isValidPlayerTurn = ({
  isOnlineGame,
  isBlackTurn,
  isTwoPlayerInTheGame,
  loggedInUser,
  blackPlayerID,
  whitePlayerID,
}: Props) => {
  console.log('isValidPlayerTurn()')
  if (!isOnlineGame) return true
  if (isOnlineGame && isTwoPlayerInTheGame) {
    if (isBlackTurn && loggedInUser?._id === blackPlayerID) {
      return true
    } else if (!isBlackTurn && loggedInUser?._id === whitePlayerID) {
      return true
    }
  }
  return false
}
