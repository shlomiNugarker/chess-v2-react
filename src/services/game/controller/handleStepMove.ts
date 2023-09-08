import { GameState } from '../../../models/GameState'
import { isNextStepLegal } from '../isNextStepLegal'
import { isPawnStepsEnd } from '../isPawnStepsEnd'
import { movePiece } from '../movePiece'
import { cleanBoard } from './cleanBoard'

export const handleStepMove = async (
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
  if (!isMoveLegal) return

  const newState = movePiece(gameState, cellCoord)

  if (newState && !newState?.isGameStarted && !newState?.isGameStarted)
    newState.isGameStarted = true

  // audioStep.play()

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
