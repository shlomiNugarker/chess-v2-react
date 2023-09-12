import { OnChoosePieceToAdd } from '../../../models/OnChoosePieceToAdd'
import { addPieceInsteadPawn } from '../service/addPieceInsteadPawn'
import { cleanBoard } from './cleanBoard'

export const onChoosePieceToAdd: OnChoosePieceToAdd = async ({
  piece,
  cellCoordsToAddInsteadPawn,
  updateGameState,
  gameState,
  setIsPromotionChoice,
  setGameState,
}) => {
  console.log('onChoosePieceToAdd()')
  if (!cellCoordsToAddInsteadPawn || !gameState) return
  const { newState } = addPieceInsteadPawn(
    gameState,
    cellCoordsToAddInsteadPawn,
    piece
  )
  newState.isBlackTurn = !newState.isBlackTurn
  await updateGameState(newState, setGameState)
  cleanBoard()
  setIsPromotionChoice(false)
}
