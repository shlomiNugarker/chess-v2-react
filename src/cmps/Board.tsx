import { useEffect } from 'react'
import { RootState } from '../features'
import {
  setIsBlackKingThreatened,
  setIsWhiteKingThreatened,
  setNewState,
  setSelectedCellCoord,
  setSwitchTurn,
} from '../features/game/gameSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import { checkIfKingThreatened } from '../services/game/checkIfKingThreatened'
import { doCastling } from '../services/game/doCastling'
import {
  cleanBoard,
  getPossibleCoords,
  isColorPieceWorthCurrPlayerColor,
  isNextStepLegal,
  markCells,
  movePiece,
} from '../services/game/main'

export const Board: () => JSX.Element = () => {
  const dispatch = useAppDispatch()

  const { board } = useAppSelector((state: RootState) => state.game)
  const gameState = useAppSelector((state: RootState) => state.game)

  useEffect(() => {
    checkIfKingThreatened(gameState)
  }, [gameState, gameState.isBlackTurn])
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
      const isEvEatable = ev.target.classList.contains('eatable')
      const isEvCastling = ev.target.classList.contains('castle')

      if (isEvEatable && gameState.selectedCellCoord) {
        let { isMoveLegal } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return
        const newState = movePiece(gameState, toCellCoord)
        newState && dispatch(setNewState(newState))
        switchTurn()
        cleanBoard()
        return
      }

      if (isEvCastling && gameState.selectedCellCoord) {
        const { isMoveLegal } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return

        const newState = doCastling(gameState, ev.target)
        newState && dispatch(setNewState(newState))
        switchTurn()
        cleanBoard()
        return
      }

      if (!isColorPieceWorthCurrPlayerColor(gameState, piece) && piece !== '')
        return

      if (isEvSelected) {
        ev.target.classList.remove('selected')
        dispatch(setSelectedCellCoord(null))
        cleanBoard()
        return
      }

      if (isEvMarked && gameState.selectedCellCoord) {
        const { isMoveLegal } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return
        const newState = movePiece(gameState, toCellCoord)
        newState && dispatch(setNewState(newState))
        switchTurn()
        cleanBoard()
        return
      }
      cleanBoard()

      ev.target.classList.add('selected')
      dispatch(setSelectedCellCoord(toCellCoord))
      const possibleCoords = getPossibleCoords(gameState, piece, toCellCoord)
      possibleCoords && markCells(gameState, possibleCoords)
    }
  }

  const switchTurn = () => {
    dispatch(setSwitchTurn())
  }

  if (!board) return <div className="board-cmp">Loading...</div>

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
                  style={{ cursor: board[i][j] && 'pointer' }}
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
