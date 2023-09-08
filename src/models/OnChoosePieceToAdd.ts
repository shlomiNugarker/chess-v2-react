import { GameState } from './GameState'
import { UpdateGameState } from './UpdateGameState'

type Props = {
  piece: string
  cellCoordsToAddInsteadPawn: {
    i: number
    j: number
  } | null
  updateGameState: UpdateGameState
  gameState: GameState
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
}

export type OnChoosePieceToAdd = ({
  piece,
  cellCoordsToAddInsteadPawn,
  updateGameState,
  gameState,
  setIsPromotionChoice,
  setGameState,
}: Props) => Promise<void>
