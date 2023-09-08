import { GameState } from '../../../models/GameState'
import { UpdateGameState } from '../../../models/UpdateGameState'
import { isNextStepLegal } from '../service/isNextStepLegal'
import { isPawnStepsEnd } from '../service/isPawnStepsEnd'
import { movePiece } from '../service/movePiece'
import { cleanBoard } from './cleanBoard'

export const handleStepMove = async (
  target: Element,
  gameState: GameState,
  cellCoord: { i: number; j: number },
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>,
  updateGameState: UpdateGameState,
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
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
    newState && (await updateGameState(newState, setGameState))
    setCellCoordsToAddInsteadPawn(cellCoord)
    return
  }
  newState.isBlackTurn = !newState.isBlackTurn
  await updateGameState(newState, setGameState)

  cleanBoard()
}
