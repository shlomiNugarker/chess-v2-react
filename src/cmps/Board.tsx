import { useEffect, useState } from 'react'
import { RootState } from '../features'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import { checkIfKingThreatened } from '../services/game/checkIfKingThreatened'
import { cleanBoard } from '../services/game/controller/cleanBoard'
import { doCastling } from '../services/game/doCastling'
import { getPossibleCoords } from '../services/game/getPossibleCoords'
import { isColorPieceWorthCurrPlayerColor } from '../services/game/isColorPieceWorthCurrPlayerColor'
import { markCells } from '../services/game/controller/markCells'
import { movePiece } from '../services/game/movePiece'
import { isNextStepLegal } from '../services/game/isNextStepLegal'
import { PromotionChoice } from './PromotionChoice'
import { isPawnStepsEnd } from '../services/game/isPawnStepsEnd'
import { addPieceInsteadPawn } from '../services/game/addPieceInsteadPawn'
import {
  setSelectedCellCoord,
  setSwitchTurn,
  updateTime,
} from '../features/game/gameSlice'
import { updateState } from '../features/game/asyncActions'
import { isPlayerWin } from '../services/game/isPlayerWin'
import { GameState } from '../models/GameState'

interface props {
  isTwoPlayerInTheGame: boolean
  setIsTwoPlayerInTheGame: React.Dispatch<React.SetStateAction<boolean>>
}

const audioStep = new Audio(require('../assets/sound/step.mp3'))
const castleStep = new Audio(require('../assets/sound/castle.mp3'))
// const checkStep = new Audio(require('../assets/sound/check.mp3'))

export const Board = ({ isTwoPlayerInTheGame }: props) => {
  const dispatch = useAppDispatch()

  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)

  const [isPromotionChoice, setIsPromotionChoice] = useState(false)
  const [cellCoordsToAddInsteadPawn, setCellCoordsToAddInsteadPawn] = useState<{
    i: number
    j: number
  } | null>(null)

  const onChoosePieceToAdd = (piece: string) => {
    if (!cellCoordsToAddInsteadPawn || !gameState) return
    const { newState } = addPieceInsteadPawn(
      gameState,
      cellCoordsToAddInsteadPawn,
      piece
    )
    newState.isBlackTurn = !newState.isBlackTurn
    dispatch(updateState(newState))
    cleanBoard()
    setIsPromotionChoice(false)
  }
  const handleEatableMove = (
    target: Element,
    gameState: GameState,
    cellCoord: { i: number; j: number }
  ) => {
    let { isMoveLegal, state } = isNextStepLegal(gameState, target)

    if (state.isBlackTurn && state.isBlackKingThreatened) return
    if (!state.isBlackTurn && state.isWhiteKingThreatened) return
    if (!isMoveLegal) return

    const newState = movePiece(gameState, cellCoord)
    audioStep.play()

    newState && isPlayerWin(newState)

    if (!newState) return
    if (isPawnStepsEnd(state, cellCoord)) {
      setIsPromotionChoice(true)
      newState && dispatch(updateState(newState))
      setCellCoordsToAddInsteadPawn(cellCoord)
      return
    }
    newState.isBlackTurn = !newState.isBlackTurn
    dispatch(updateState(newState))
    cleanBoard()
  }
  const handleCastlingMove = (
    target: Element,
    gameState: GameState,
    cellCoord: { i: number; j: number }
  ) => {
    const { isMoveLegal } = isNextStepLegal(gameState, target)
    if (!isMoveLegal) return

    const isCastleLegals = doCastling(gameState, target)
    if (isCastleLegals?.newState) {
      isCastleLegals.newState.isBlackTurn = !isCastleLegals.newState.isBlackTurn
    }
    castleStep.play()

    isCastleLegals &&
      isCastleLegals.newState &&
      isCastleLegals.isCastleLegal &&
      dispatch(updateState(isCastleLegals.newState))

    if (isCastleLegals && !isCastleLegals.isCastleLegal) return
    dispatch(setSwitchTurn())
    cleanBoard()
  }
  const handleStepMove = (
    target: Element,
    gameState: GameState,
    cellCoord: { i: number; j: number }
  ) => {
    const { isMoveLegal, state } = isNextStepLegal(gameState, target)
    if (!isMoveLegal) return

    const newState = movePiece(gameState, cellCoord)

    if (newState && !newState?.isGameStarted && !newState?.isGameStarted)
      newState.isGameStarted = true

    audioStep.play()
    newState && isPlayerWin(newState)

    if (!newState) return
    if (isPawnStepsEnd(state, cellCoord)) {
      setIsPromotionChoice(true)
      newState && dispatch(updateState(newState))
      setCellCoordsToAddInsteadPawn(cellCoord)
      return
    }
    newState.isBlackTurn = !newState.isBlackTurn
    dispatch(updateState(newState))

    cleanBoard()
  }
  const handlePieceSelection = (
    target: Element,
    gameState: GameState,
    cellCoord: { i: number; j: number },
    piece: string
  ) => {
    cleanBoard()
    gameState.board[cellCoord.i][cellCoord.j] &&
      target.classList.add('selected')
    dispatch(setSelectedCellCoord(cellCoord))
    const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
    possibleCoords && markCells(gameState, possibleCoords)
  }
  const isValidMove = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (gameState?.isOnline && !isTwoPlayerInTheGame) return false
    if (gameState?.isOnline && !isValidPlayerTurn()) return false
    if (ev.target instanceof Element && gameState) return true
    return false
  }
  const isValidPlayerTurn = () => {
    const loggedInUserId = authState.loggedInUser?._id
    const isBlackTurn = gameState?.isBlackTurn
    const isBlackPlayer = loggedInUserId === gameState?.players?.black
    const isWhitePlayer = loggedInUserId === gameState?.players?.white

    return (isBlackTurn && isBlackPlayer) || (!isBlackTurn && isWhitePlayer)
  }

  const cellClicked = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (!isValidMove(ev, i, j)) return

    if (ev.target instanceof Element && gameState) {
      const cellCoord = { i, j }
      const piece = gameState.board[i][j]
      const isSquareSelected = ev.target.classList.contains('selected')
      const isSquareMarked = ev.target.classList.contains('mark')
      const isSquareEatable = ev.target.classList.contains('eatable')
      const isSquareCastling = ev.target.classList.contains('castle')

      if (isSquareEatable && gameState.selectedCellCoord) {
        handleEatableMove(ev.target, gameState, cellCoord)
        return
      }

      if (isSquareCastling && gameState.selectedCellCoord) {
        handleCastlingMove(ev.target, gameState, cellCoord)
        return
      }

      if (!isColorPieceWorthCurrPlayerColor(gameState, piece) && piece !== '')
        return

      // unselect:
      if (isSquareSelected) {
        ev.target.classList.remove('selected')
        cleanBoard()
        return
      }

      if (isSquareMarked && gameState.selectedCellCoord) {
        handleStepMove(ev.target, gameState, cellCoord)
        return
      }

      handlePieceSelection(ev.target, gameState, cellCoord, piece)
    }
  }

  useEffect(() => {
    if (gameState) {
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
    }
  }, [gameState, gameState?.isBlackTurn])
  useEffect(() => {
    // handle time:
    const intervalId = setInterval(() => {
      if (gameState && gameState.isBlackTurn && gameState.isGameStarted) {
        dispatch(
          updateTime({
            white: gameState?.remainingTime.white,
            black: gameState?.remainingTime.black - 1000,
          })
        )
      }
      if (gameState && !gameState.isBlackTurn && gameState.isGameStarted) {
        dispatch(
          updateTime({
            white: gameState?.remainingTime.white - 1000,
            black: gameState?.remainingTime.black,
          })
        )
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch, gameState, gameState?.isGameStarted])

  const screenStyle =
    gameState?.players?.black === authState?.loggedInUser?._id
      ? 'blackScreen'
      : 'whiteScreen'

  return (
    <section className={'board-cmp ' + screenStyle}>
      <div>
        <table>
          <tbody>
            {gameState?.board.map((tr, i) => (
              <tr key={'tr' + i}>
                {gameState.board[i].map((piece, j) => (
                  <td
                    key={i.toString() + j}
                    id={`cell-${i}-${j}`}
                    className={(i + j) % 2 === 0 ? 'white' : 'black'}
                    style={{ cursor: piece && 'pointer' }}
                    onDrop={(ev) => {
                      ev.preventDefault()
                      cellClicked(ev, i, j)
                    }}
                    onDragOver={(ev) => {
                      ev.preventDefault()
                    }}
                    draggable="true"
                    onMouseDown={(ev) => {
                      cellClicked(ev, i, j)
                    }}
                  >
                    {piece}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPromotionChoice && (
        <PromotionChoice onChoosePieceToAdd={onChoosePieceToAdd} />
      )}
    </section>
  )
}
