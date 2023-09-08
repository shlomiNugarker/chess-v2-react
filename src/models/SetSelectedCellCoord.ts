import { GameState } from './GameState'
import { UpdateGameState } from './UpdateGameState'

export type SetSelectedCellCoord = ({
  cellCoord,
  gameState,
  updateGameState,
  setGameState,
}: Props) => void

type Props = {
  cellCoord: GameState['selectedCellCoord']
  gameState: GameState
  updateGameState: UpdateGameState
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
}
