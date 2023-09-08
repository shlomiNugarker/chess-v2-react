import { SetSelectedCellCoord } from '../services/game/controller/setSelectedCellCoord'
import { GameState } from './GameState'
import { UpdateGameState } from './UpdateGameState'
import { User } from './User'

export type CellClicked = ({
  ev,
  i,
  j,
  gameState,
  isTwoPlayerInTheGame,
  loggedInUser,
  setIsPromotionChoice,
  updateGameState,
  setCellCoordsToAddInsteadPawn,
  setSelectedCellCoord,
  setGameState,
}: {
  ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  i: number
  j: number
  gameState: GameState
  isTwoPlayerInTheGame: boolean
  loggedInUser: User | null | undefined
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  updateGameState: UpdateGameState
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >
  setSelectedCellCoord: SetSelectedCellCoord
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
}) => void
