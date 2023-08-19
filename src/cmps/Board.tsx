import { useEffect, useState } from 'react'
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

import { isPlayerWin } from '../services/game/isPlayerWin'
import { GameState } from '../models/GameState'
import { User } from '../models/User'

interface Props {
  isTwoPlayerInTheGame: boolean
  gameState: GameState | null
  loggedInUser: User | null
  updateGameState: (newState: GameState) => Promise<void | GameState>
  setSwitchTurn: () => void
  setSelectedCellCoord: (cellCoord: GameState['selectedCellCoord']) => void
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
}

import audioStepUrl from '../assets/sound/step.mp3'
import castleStepUrl from '../assets/sound/castle.mp3'
import { ChatState } from '../models/ChatState'
import { useNavigate } from 'react-router-dom'
import { ChessBoard } from './ChessBoard'

const audioStep = new Audio(audioStepUrl)
const castleStep = new Audio(castleStepUrl)

export const Board = ({
  isTwoPlayerInTheGame,
  gameState,
  loggedInUser,
  updateGameState,
  setSwitchTurn,
  setSelectedCellCoord,
  setGameState,
  setChatState,
}: Props) => {
  const navigate = useNavigate()
  const [isWin, setIsWin] = useState(false)
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
    updateGameState(newState)
    cleanBoard()
    setIsPromotionChoice(false)
  }
  const handleEatableMove = (
    target: Element,
    gameState: GameState,
    cellCoord: { i: number; j: number }
  ) => {
    const { isMoveLegal, state } = isNextStepLegal(gameState, target)

    if (
      (state.isBlackTurn && state.isBlackKingThreatened) ||
      (!state.isBlackTurn && state.isWhiteKingThreatened) ||
      !isMoveLegal
    ) {
      return
    }

    const newState = movePiece(gameState, cellCoord)
    audioStep.play()

    newState && isPlayerWin(newState)

    if (!newState) return
    if (isPawnStepsEnd(state, cellCoord)) {
      setIsPromotionChoice(true)
      newState && updateGameState(newState)
      setCellCoordsToAddInsteadPawn(cellCoord)
      return
    }
    newState.isBlackTurn = !newState.isBlackTurn
    updateGameState(newState)
    cleanBoard()
  }
  const handleCastlingMove = (target: Element, gameState: GameState) => {
    const { isMoveLegal } = isNextStepLegal(gameState, target)
    if (!isMoveLegal) return

    const isCastleLegals = doCastling(gameState, target)
    if (isCastleLegals?.newState) {
      isCastleLegals.newState.isBlackTurn = !isCastleLegals.newState.isBlackTurn
    }
    castleStep.play()

    if (
      isCastleLegals &&
      isCastleLegals.newState &&
      isCastleLegals.isCastleLegal
    ) {
      console.log('update')
      console.table(isCastleLegals.newState.board)

      updateGameState(isCastleLegals.newState)
    }
    if (isCastleLegals && !isCastleLegals.isCastleLegal) return
    setSwitchTurn()
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

    if (!newState) return
    if (isPawnStepsEnd(state, cellCoord)) {
      setIsPromotionChoice(true)
      newState && updateGameState(newState)
      setCellCoordsToAddInsteadPawn(cellCoord)
      return
    }
    newState.isBlackTurn = !newState.isBlackTurn
    updateGameState(newState)

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
    setSelectedCellCoord(cellCoord)
    const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
    possibleCoords && markCells(gameState, possibleCoords)
  }
  const isValidMove = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    if (gameState?.isOnline && !isTwoPlayerInTheGame) return false
    if (gameState?.isOnline && !isValidPlayerTurn()) return false
    if (ev.target instanceof Element && gameState) return true
    return false
  }
  const isValidPlayerTurn = () => {
    const loggedInUserId = loggedInUser?._id
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
    if (!isValidMove(ev)) return

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
        handleCastlingMove(ev.target, gameState)
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
    if (gameState && !isWin && isPlayerWin(gameState)) {
      setIsWin(true)
    }
  }, [gameState, gameState?.isBlackTurn, isWin])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.isBlackTurn])

  // useEffect(() => {
  //   // handle time:
  //   const intervalId = setInterval(() => {
  //     if (gameState && gameState.isBlackTurn && gameState.isGameStarted) {
  //       dispatch(
  //         updateTime({
  //           white: gameState?.remainingTime.white,
  //           black: gameState?.remainingTime.black - 1000,
  //         })
  //       )
  //     }
  //     if (gameState && !gameState.isBlackTurn && gameState.isGameStarted) {
  //       dispatch(
  //         updateTime({
  //           white: gameState?.remainingTime.white - 1000,
  //           black: gameState?.remainingTime.black,
  //         })
  //       )
  //     }
  //   }, 1000)

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [gameState, gameState?.isGameStarted])

  const screenStyle =
    gameState?.players?.black === loggedInUser?._id
      ? 'blackScreen'
      : 'whiteScreen'

  return (
    <section className={'board-cmp ' + screenStyle}>
      {isWin && (
        <>
          <span style={{ color: 'white' }}>We have a winner here !'😁</span>
          <button
            onClick={() => {
              console.log()
              setGameState(null)
              setChatState(null)
              navigate('/')
            }}
          >
            Reset
          </button>
        </>
      )}
      <div>
        <ChessBoard state={gameState} cellClicked={cellClicked} />
      </div>

      {isPromotionChoice && gameState && (
        <PromotionChoice
          onChoosePieceToAdd={onChoosePieceToAdd}
          gameState={gameState}
        />
      )}
    </section>
  )
}
