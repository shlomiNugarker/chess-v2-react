import { useAuthContext } from '../context/AuthContext'
import { CellClicked } from '../models/CellClicked'
import { GameState } from '../models/GameState'
import { SetSelectedCellCoordType } from '../models/SetSelectedCellCoord'
import { UpdateGameState } from '../models/UpdateGameState'

interface Props {
  state: GameState | null
  isTwoPlayerInTheGame: boolean
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  updateGameState: UpdateGameState
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >
  cellClicked: CellClicked
  setSelectedCellCoord: SetSelectedCellCoordType
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
}

export const ChessBoard = ({
  state,
  cellClicked,
  isTwoPlayerInTheGame,
  updateGameState,
  setIsPromotionChoice,
  setCellCoordsToAddInsteadPawn,
  setSelectedCellCoord,
  setGameState,
}: Props) => {
  const authContextData = useAuthContext()
  // console.log('render ChessBoard.tsx')
  return (
    <table className={'chess-board'}>
      <tbody>
        {state?.board.map((_tr, i) => (
          <tr key={'tr' + i}>
            {state.board[i].map((piece, j) => (
              <td
                key={i.toString() + j}
                id={`cell-${i}-${j}`}
                className={(i + j) % 2 === 0 ? 'white' : 'black'}
                style={{ cursor: piece && 'pointer' }}
                onDrop={(ev) => {
                  ev.preventDefault()
                  cellClicked({
                    ev,
                    i,
                    j,
                    gameState: state,
                    isTwoPlayerInTheGame,
                    loggedInUser: authContextData?.loggedInUser,
                    setIsPromotionChoice,
                    updateGameState,
                    setCellCoordsToAddInsteadPawn,
                    setSelectedCellCoord,
                    setGameState,
                  })
                }}
                onDragOver={(ev) => {
                  ev.preventDefault()
                }}
                draggable="true"
                onMouseDown={(ev) => {
                  cellClicked({
                    ev,
                    i,
                    j,
                    gameState: state,
                    isTwoPlayerInTheGame,
                    loggedInUser: authContextData?.loggedInUser,
                    setIsPromotionChoice,
                    updateGameState,
                    setCellCoordsToAddInsteadPawn,
                    setSelectedCellCoord,
                    setGameState,
                  })
                }}
              >
                {piece}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
