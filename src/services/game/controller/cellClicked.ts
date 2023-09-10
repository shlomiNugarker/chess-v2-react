import { isColorPieceWorthCurrPlayerColor } from '../service/isColorPieceWorthCurrPlayerColor'

import { cleanBoard } from './cleanBoard'

import { CellClicked } from '../../../models/CellClicked'
import { handleEatableMove } from './handleEatableMove'
import { handleCastlingMove } from './handleCastlingMove'
import { handleStepMove } from './handleStepMove'
import { isValidPlayerTurn } from './isValidPlayerTurn'
import { handlePieceSelection } from './handlePieceSelection'

// import audioStepUrl from '../assets/sound/step.mp3'
// import castleStepUrl from '../assets/sound/castle.mp3'
// const audioStep = new Audio(audioStepUrl)
// const castleStep = new Audio(castleStepUrl)

export const cellClicked: CellClicked = ({
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
}) => {
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
      handleEatableMove({
        target: ev.target,
        gameState,
        cellCoord,
        setIsPromotionChoice,
        updateGameState,
        setCellCoordsToAddInsteadPawn,
        setGameState,
      })
    } else if (isSquareCastling && gameState.selectedCellCoord) {
      handleCastlingMove(ev.target, gameState, updateGameState, setGameState)
    } else if (
      piece &&
      piece !== '' &&
      !isColorPieceWorthCurrPlayerColor(gameState, piece)
    ) {
      return
    } else if (isSquareSelected) {
      // unselect:
      ev.target.classList.remove('selected')
      cleanBoard()
    } else if (isSquareMarked && gameState.selectedCellCoord) {
      handleStepMove({
        target: ev.target,
        gameState,
        cellCoord,
        setIsPromotionChoice,
        updateGameState,
        setCellCoordsToAddInsteadPawn,
        setGameState,
      })
    } else {
      handlePieceSelection({
        target: ev.target,
        gameState,
        cellCoord,
        piece,
        setGameState,
        updateGameState,
        setSelectedCellCoord,
      })
    }
  }
}
