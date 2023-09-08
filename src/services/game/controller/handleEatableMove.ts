import { GameState } from '../../../models/GameState'
import { UpdateGameState } from '../../../models/UpdateGameState'
import { isNextStepLegal } from '../service/isNextStepLegal'
import { isPawnStepsEnd } from '../service/isPawnStepsEnd'
import { movePiece } from '../service/movePiece'
import { cleanBoard } from './cleanBoard'

type Props = {
  target: Element
  gameState: GameState
  cellCoord: { i: number; j: number }
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  updateGameState: UpdateGameState
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
}

export const handleEatableMove = async ({
  target,
  gameState,
  cellCoord,
  setIsPromotionChoice,
  updateGameState,
  setCellCoordsToAddInsteadPawn,
  setGameState,
}: Props) => {
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
    newState && (await updateGameState(newState, setGameState))
    setCellCoordsToAddInsteadPawn(cellCoord)
    return
  }
  newState.isBlackTurn = !newState.isBlackTurn
  await updateGameState(newState, setGameState)
  cleanBoard()
}
