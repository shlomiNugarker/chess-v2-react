import { GameState } from './GameState'
import { UpdateGameState } from './UpdateGameState'
import { User } from './User'

export type CellClicked = (
  ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  i: number,
  j: number,
  gameState: GameState,
  isTwoPlayerInTheGame: boolean,
  loggedInUser: User | null | undefined,
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>,
  updateGameState: UpdateGameState,
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >,
  setSelectedCellCoord: (cellCoord: GameState['selectedCellCoord']) => void,
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
) => void
