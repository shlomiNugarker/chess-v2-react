import { RootState } from '../features'
import {
  gPieces,
  setNewState,
  setSelectedCellCoord,
} from '../features/game/gameSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import {
  cleanBoard,
  getPossibleCoords,
  markCells,
  movePiece,
} from '../services/game/main'

export const Board: () => JSX.Element = () => {
  const dispatch = useAppDispatch()

  const { board } = useAppSelector((state: RootState) => state.game)
  const gameState = useAppSelector((state: RootState) => state.game)

  const cellClicked = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (ev.target instanceof Element) {
      const toCellCoord = { i, j }
      const piece = board[i][j]
      const isEvSelected = ev.target.classList.contains('selected')
      const isEvMarked = ev.target.classList.contains('mark')

      if (isEvMarked) {
        const newState = movePiece(gameState, toCellCoord)
        newState && dispatch(setNewState(newState))
        cleanBoard()
        return
      }

      const possibleCoords = getPossibleCoords(gameState, piece, toCellCoord)
      markCells(gameState, possibleCoords)

      dispatch(setSelectedCellCoord(toCellCoord))
    }
  }

  if (!board) return <div>Loading...</div>

  return (
    <section className="board-cmp">
      <table>
        <tbody>
          {board.map((tr, i) => (
            <tr key={'tr' + i}>
              {board[i].map((td, j) => (
                <td
                  key={i + j}
                  id={`cell-${i}-${j}`}
                  className={(i + j) % 2 === 0 ? 'white' : 'black'}
                  onClick={(ev) => cellClicked(ev, i, j)}
                >
                  {board[i][j]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
