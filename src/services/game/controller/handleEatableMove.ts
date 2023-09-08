import { GameState } from '../../../models/GameState'
import { isNextStepLegal } from '../isNextStepLegal'
import { isPawnStepsEnd } from '../isPawnStepsEnd'
import { movePiece } from '../movePiece'
import { cleanBoard } from './cleanBoard'

export const handleEatableMove = async (
  target: Element,
  gameState: GameState,
  cellCoord: { i: number; j: number },
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>,
  updateGameState: (newState: GameState) => Promise<void | GameState>,
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >
) => {
  const { isMoveLegal, state } = isNextStepLegal(gameState, target)

  if (
    (state.isBlackTurn && state.isBlackKingThreatened) ||
    (!state.isBlackTurn && state.isWhiteKingThreatened) ||
    !isMoveLegal
  ) {
    return
  }

  const newState = movePiece(gameState, cellCoord)
  // audioStep.play()

  // if (newState) isPlayerWin(newState)

  if (!newState) return

  if (isPawnStepsEnd(state, cellCoord)) {
    setIsPromotionChoice(true)
    newState && (await updateGameState(newState))
    setCellCoordsToAddInsteadPawn(cellCoord)
    return
  }
  newState.isBlackTurn = !newState.isBlackTurn
  await updateGameState(newState)
  cleanBoard()
}
