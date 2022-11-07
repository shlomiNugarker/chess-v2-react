import { useEffect, useState } from 'react'
import { RootState } from '../features'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import { checkIfKingThreatened } from '../services/game/checkIfKingThreatened'
import { cleanBoard } from '../services/game/cleanBoard'
import { doCastling } from '../services/game/doCastling'
import { getPossibleCoords } from '../services/game/getPossibleCoords'
import { isColorPieceWorthCurrPlayerColor } from '../services/game/isColorPieceWorthCurrPlayerColor'
import { markCells } from '../services/game/markCells'
import { movePiece } from '../services/game/movePiece'
import { isNextStepLegal } from '../services/game/isNextStepLegal'
import {
  addHistoryState,
  setNewState,
  setSelectedCellCoord,
  setSwitchTurn,
} from '../features/game/gameSlice'
import { GameState } from '../models/GameState'
import { getJoke } from '../features/game/asyncActions'

export const Board = () => {
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
      const isEvEatable = ev.target.classList.contains('eatable')
      const isEvCastling = ev.target.classList.contains('castle')

      if (isEvEatable && gameState.selectedCellCoord) {
        let { isMoveLegal, state } = isNextStepLegal(gameState, ev.target)

        if (state.isBlackTurn && state.isBlackKingThreatened) return
        if (!state.isBlackTurn && state.isWhiteKingThreatened) return
        if (!isMoveLegal) return
        const newState = movePiece(gameState, toCellCoord)
        newState && dispatch(setNewState(newState))
        // newState
        //  && onAddHistoryState(newState)
        onSwitchTurn()
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
        //  &&
        // onAddHistoryState(isCastleLegals.newState)

        if (isCastleLegals && !isCastleLegals.isCastleLegal) return

        onSwitchTurn()
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
        // newState && onAddHistoryState(newState)
        onSwitchTurn()
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

  useEffect(() => {
    checkIfKingThreatened(gameState)
  }, [gameState, gameState.isBlackTurn])

  const onSwitchTurn = () => {
    dispatch(setSwitchTurn())
  }

  const onAddHistoryState = (state: GameState) => {
    dispatch(addHistoryState(state))
  }

  if (!board && !gameState.boardHistory.length)
    return <div className="board-cmp">Loading...</div>

  return (
    <section className="board-cmp">
      <div>
        {/* <div className="btns">
          <button>back</button>
          <button>next</button>
        </div> */}
        <div className="pieces">
          {gameState.eatenPieces.black.map((eatenPiece, idx) => (
            <span key={eatenPiece + idx}>{eatenPiece}</span>
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
          {gameState.eatenPieces.white.map((eatenPiece, idx) => (
            <span key={eatenPiece + idx}>{eatenPiece}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
