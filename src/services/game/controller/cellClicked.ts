import { isColorPieceWorthCurrPlayerColor } from '../service/isColorPieceWorthCurrPlayerColor'

import { cleanBoard } from './cleanBoard'

// import audioStepUrl from '../assets/sound/step.mp3'
// import castleStepUrl from '../assets/sound/castle.mp3'

import { CellClicked } from '../../../models/CellClicked'
import { handleEatableMove } from './handleEatableMove'
import { handleCastlingMove } from './handleCastlingMove'
import { handleStepMove } from './handleStepMove'
import { isValidPlayerTurn } from './isValidPlayerTurn'
import { handlePieceSelection } from './handlePieceSelection'

// const audioStep = new Audio(audioStepUrl)
// const castleStep = new Audio(castleStepUrl)

export const cellClicked: CellClicked = (
  ev,
  i,
  j,
  gameState,
  isTwoPlayerInTheGame,
  loggedInUser,
  setIsPromotionChoice,
  updateGameState,
  setCellCoordsToAddInsteadPawn,
  setSelectedCellCoord
) => {
  //   if (!hasGameStarted) sethasGameStarted(true)
  if (!isValidPlayerTurn(gameState, isTwoPlayerInTheGame, loggedInUser)) return

  if (ev.target instanceof Element && gameState) {
    const cellCoord = { i, j }
    const piece = gameState.board[i][j]
    const isSquareSelected = ev.target.classList.contains('selected')
    const isSquareMarked = ev.target.classList.contains('mark')
    const isSquareEatable = ev.target.classList.contains('eatable')
    const isSquareCastling = ev.target.classList.contains('castle')

    if (isSquareEatable && gameState.selectedCellCoord) {
      handleEatableMove(
        ev.target,
        gameState,
        cellCoord,
        setIsPromotionChoice,
        updateGameState,
        setCellCoordsToAddInsteadPawn
      )
      return
    }

    if (isSquareCastling && gameState.selectedCellCoord) {
      handleCastlingMove(ev.target, gameState, updateGameState)
      return
    }

    if (
      piece &&
      piece !== '' &&
      !isColorPieceWorthCurrPlayerColor(gameState, piece)
    )
      return

    // unselect:
    if (isSquareSelected) {
      ev.target.classList.remove('selected')
      cleanBoard()
      return
    }

    if (isSquareMarked && gameState.selectedCellCoord) {
      handleStepMove(
        ev.target,
        gameState,
        cellCoord,
        setIsPromotionChoice,
        updateGameState,
        setCellCoordsToAddInsteadPawn
      )
      return
    }

    handlePieceSelection(
      ev.target,
      gameState,
      cellCoord,
      piece,
      setSelectedCellCoord
    )
  }
}
