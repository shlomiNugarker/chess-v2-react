import { GameState } from '../../../models/GameState'
import { UpdateGameState } from '../../../models/UpdateGameState'
import { doCastling } from '../service/doCastling'
import { isNextStepLegal } from '../service/isNextStepLegal'
import { cleanBoard } from './cleanBoard'

export const handleCastlingMove = async (
  target: Element,
  gameState: GameState,
  updateGameState: UpdateGameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
) => {
  console.log('handleCastlingMove()')
  const { isMoveLegal } = isNextStepLegal(gameState, target)
  if (!isMoveLegal) return

  const isCastleLegals = doCastling(gameState, target)
  if (isCastleLegals?.newState) {
    isCastleLegals.newState.isBlackTurn = !isCastleLegals.newState.isBlackTurn
  }
  // castleStep.play()

  if (
    isCastleLegals &&
    isCastleLegals.newState &&
    isCastleLegals.isCastleLegal
  ) {
    await updateGameState(isCastleLegals.newState, setGameState)
  }
  if (isCastleLegals && !isCastleLegals.isCastleLegal) return
  cleanBoard()
}
