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
  setNewState,
  setSelectedCellCoord,
  setSwitchTurn,
} from '../features/game/gameSlice'
import { PromotionChoice } from './PromotionChoice'
import { GameState } from '../models/GameState'
import _ from 'lodash'

export const Board = () => {
  const dispatch = useAppDispatch()

  const { board, isBlackTurn } = useAppSelector(
    (state: RootState) => state.game
  )
  const gameState = useAppSelector((state: RootState) => state.game)

  const [isPromotionChoice, setIsPromotionChoice] = useState(false)

  function isPawnStepsEnd(state: GameState, coord: { i: number; j: number }) {
    const piece = state.board[coord.i][coord.j]
    if (piece === gameState.pieces.PAWN_BLACK && isBlackTurn && coord.i === 7) {
      return true
    } else if (
      piece === gameState.pieces.PAWN_WHITE &&
      !isBlackTurn &&
      coord.i === 0
    ) {
      return true
    }
  }

  const [cellCoordsToAddInsteadPawn, setCellCoordsToAddInsteadPawn] = useState<{
    i: number
    j: number
  } | null>(null)

  function onChoosePieceToAdd(piece: string) {
    console.log(piece)
    console.log({ cellCoordsToAddInsteadPawn })
    if (!cellCoordsToAddInsteadPawn) return

    const copiedState = _.cloneDeep(gameState)

    copiedState.board[cellCoordsToAddInsteadPawn.i][
      cellCoordsToAddInsteadPawn.j
    ] = piece

    copiedState.isBlackTurn = !copiedState.isBlackTurn
    copiedState && dispatch(setNewState(copiedState))

    // onSwitchTurn()
    cleanBoard()
    setIsPromotionChoice(false)
  }

  const cellClicked = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (ev.target instanceof Element) {
      const cellCoord = { i, j }
      const piece = board[i][j]
      const isEvSelected = ev.target.classList.contains('selected')
      const isEvMarked = ev.target.classList.contains('mark')
      const isEvEatable = ev.target.classList.contains('eatable')
      const isEvCastling = ev.target.classList.contains('castle')

      // if it's possible to eat:
      if (isEvEatable && gameState.selectedCellCoord) {
        let { isMoveLegal, state } = isNextStepLegal(gameState, ev.target)

        if (state.isBlackTurn && state.isBlackKingThreatened) return
        if (!state.isBlackTurn && state.isWhiteKingThreatened) return
        if (!isMoveLegal) return

        const newState = movePiece(gameState, cellCoord)
        if (!newState) return
        if (isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && dispatch(setNewState(newState))
          setCellCoordsToAddInsteadPawn(cellCoord)
          return
        }
        newState.isBlackTurn = !newState.isBlackTurn
        dispatch(setNewState(newState))

        // onSwitchTurn()
        cleanBoard()
        return
      }

      // if it's possible to catling:
      if (isEvCastling && gameState.selectedCellCoord) {
        const { isMoveLegal } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return

        const isCastleLegals = doCastling(gameState, ev.target)
        isCastleLegals &&
          isCastleLegals.newState &&
          isCastleLegals.isCastleLegal &&
          dispatch(setNewState(isCastleLegals.newState))

        if (isCastleLegals && !isCastleLegals.isCastleLegal) return

        onSwitchTurn()
        cleanBoard()
        return
      }

      if (!isColorPieceWorthCurrPlayerColor(gameState, piece) && piece !== '')
        return

      // unselect
      if (isEvSelected) {
        ev.target.classList.remove('selected')
        cleanBoard()
        return
      }

      // if it's possible to step:
      if (isEvMarked && gameState.selectedCellCoord) {
        const { isMoveLegal, state } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return

        const newState = movePiece(gameState, cellCoord)
        if (!newState) return
        if (isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && dispatch(setNewState(newState))
          setCellCoordsToAddInsteadPawn(cellCoord)
          return
        }

        newState.isBlackTurn = !newState.isBlackTurn
        dispatch(setNewState(newState))

        // onSwitchTurn()
        cleanBoard()
        return
      }

      // just selecting cell & get possibleCoords to step
      cleanBoard()
      gameState.board[i][j] && ev.target.classList.add('selected')
      dispatch(setSelectedCellCoord(cellCoord))
      const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
      possibleCoords && markCells(gameState, possibleCoords)
    }
  }

  useEffect(() => {
    checkIfKingThreatened(gameState)

    // handle case if both kings threatened one after one
    const lastKingThreatened = gameState.isBlackTurn
      ? gameState.kingPos.white
      : gameState.kingPos.black

    if (lastKingThreatened) {
      const kingEl = document.querySelector(
        `#cell-${lastKingThreatened.i}-${lastKingThreatened.j}`
      )

      if (kingEl && kingEl.classList.contains('red'))
        kingEl.classList.remove('red')
    }
  }, [gameState, gameState.isBlackTurn])

  const onSwitchTurn = () => {
    dispatch(setSwitchTurn())
  }

  if (!board && !gameState.boardHistory.length)
    return <div className="board-cmp">Loading...</div>

  return (
    <section className="board-cmp">
      <div>
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
      {isPromotionChoice && (
        <PromotionChoice
          setIsPromotionChoice={setIsPromotionChoice}
          onChoosePieceToAdd={onChoosePieceToAdd}
        />
      )}
    </section>
  )
}
