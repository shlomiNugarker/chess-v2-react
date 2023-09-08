import { GameState } from '../../../models/GameState'
import { doCastling } from '../doCastling'
import { isNextStepLegal } from '../isNextStepLegal'
import { cleanBoard } from './cleanBoard'

export const handleCastlingMove = async (
  target: Element,
  gameState: GameState,
  updateGameState: (newState: GameState) => Promise<void | GameState>
) => {
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
    await updateGameState(isCastleLegals.newState)
  }
  if (isCastleLegals && !isCastleLegals.isCastleLegal) return
  cleanBoard()
}
