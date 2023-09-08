import { GameState } from './GameState'
import { UpdateGameState } from './UpdateGameState'

export type OnChoosePieceToAdd = (
  piece: string,
  cellCoordsToAddInsteadPawn: {
    i: number
    j: number
  } | null,
  updateGameState: UpdateGameState,
  gameState: GameState,
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
) => Promise<void>
