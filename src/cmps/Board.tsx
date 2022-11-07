import { useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { RootState } from '../features'
import {
  GameState,
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

export const Board = () => {
  const dispatch = useAppDispatch()

  const { board } = useAppSelector((state: RootState) => state.game)
  const gameState = useAppSelector((state: RootState) => state.game)
  console.table(gameState.board)

  useEffect(() => {
    const { isThreatened, state } = checkIfKingThreatened(gameState)
  }, [dispatch, gameState, gameState.isBlackTurn])

  // TODO: add logic to handle isCastleLegal when eat rooks

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
        let { isMoveLegal, state } = isNextStepLegal(gameState, ev.target)
        console.log(state)

        if (state.isBlackTurn && state.isBlackKingThreatened) return
        if (!state.isBlackTurn && state.isWhiteKingThreatened) return
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

        const isCastleLegals = doCastling(gameState, ev.target)
        isCastleLegals &&
          isCastleLegals.newState &&
          isCastleLegals.isCastleLegal &&
          dispatch(setNewState(isCastleLegals.newState))

        if (isCastleLegals && !isCastleLegals.isCastleLegal) return

        switchTurn()
        cleanBoard()

        return
      }

      if (!isColorPieceWorthCurrPlayerColor(gameState, piece) && piece !== '')
        return

      if (isEvSelected) {
        ev.target.classList.remove('selected')
        // dispatch(setSelectedCellCoord(null))
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
      <div>
        <div className="pieces">
          {gameState.eatenPieces.white.map((eatenPiece) => (
            <span>{eatenPiece}</span>
          ))}
        </div>
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
        <div className="pieces">
          {gameState.eatenPieces.black.map((eatenPiece) => (
            <span>{eatenPiece}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
