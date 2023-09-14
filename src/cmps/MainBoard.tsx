import { PromotionChoice } from './PromotionChoice'
import { GameState } from '../models/GameState'
import { User } from '../models/User'
import { ChatState } from '../models/ChatState'
import { useNavigate } from 'react-router-dom'
import { ChessBoard } from './ChessBoard'
import { OnChoosePieceToAdd } from '../models/OnChoosePieceToAdd'
import { UpdateGameState } from '../models/UpdateGameState'
import { SetSelectedCellCoordType } from '../models/SetSelectedCellCoord'
// import { isValidPlayerTurn } from '../services/game/controller/isValidPlayerTurn'
import { isNextStepLegal } from '../services/game/service/isNextStepLegal'
import { isPawnStepsEnd } from '../services/game/service/isPawnStepsEnd'
import { cleanBoard } from '../services/game/controller/cleanBoard'
import { doCastling } from '../services/game/service/doCastling'
import { isColorPieceWorthCurrPlayerColor } from '../services/game/service/isColorPieceWorthCurrPlayerColor'
import { movePiece } from '../services/game/service/movePiece'
import { getPossibleCoords } from '../services/game/service/getPossibleCoords'
// import { markCells } from '../services/game/controller/markCells'

interface Props {
  isTwoPlayerInTheGame: boolean
  gameState: GameState | null
  loggedInUser: User | null
  updateGameState: UpdateGameState
  setSelectedCellCoord: SetSelectedCellCoordType
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
  isWin: boolean
  isPromotionChoice: boolean
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  //
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >
  //
  cellCoordsToAddInsteadPawn: {
    i: number
    j: number
  } | null
  //
  onChoosePieceToAdd: OnChoosePieceToAdd
}

export const MainBoard = ({
  isTwoPlayerInTheGame,
  gameState,
  loggedInUser,
  updateGameState,
  setSelectedCellCoord,
  setGameState,
  setChatState,
  isWin,
  isPromotionChoice,
  setIsPromotionChoice,
  setCellCoordsToAddInsteadPawn,
  onChoosePieceToAdd,
  cellCoordsToAddInsteadPawn,
}: Props) => {
  const navigate = useNavigate()

  function markCells(state: GameState, coords: { i: number; j: number }[]) {
    console.log('markCells()')

    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i]
      const elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
      if (!elCell) return

      const piece = state.board[coord.i][coord.j]

      if (isColorPieceWorthCurrPlayerColor(state, piece)) {
        elCell.classList.add('castle')
      }
      //
      else if (state.board[coord.i][coord.j]) {
        elCell.classList.add('eatable')
      }
      //
      else {
        elCell.innerHTML = '<span class="span"></span>'
        elCell.classList.add('mark')
      }
    }
  }

  const isValidPlayerTurn = () => {
    console.log('isValidPlayerTurn()')

    if (!gameState?.isOnline) return true
    if (gameState?.isOnline && isTwoPlayerInTheGame) {
      if (
        gameState.isBlackTurn &&
        loggedInUser?._id === gameState.players?.black
      ) {
        return true
      } else if (
        !gameState.isBlackTurn &&
        loggedInUser?._id === gameState.players?.white
      ) {
        return true
      }
    }
    return false
  }

  const handleBoardClick = async (
    ev:
      | React.DragEvent<HTMLTableDataCellElement>
      | React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (!gameState) return
    console.log('cellClicked()')

    if (!isValidPlayerTurn()) return

    if (ev.target instanceof Element && gameState) {
      const cellCoord = { i, j }
      const piece = gameState.board[i][j]
      const isSquareSelected = ev.target.classList.contains('selected')
      const isSquareMarked = ev.target.classList.contains('mark')
      const isSquareEatable = ev.target.classList.contains('eatable')
      const isSquareCastling = ev.target.classList.contains('castle')
      const target = ev.target

      if (isSquareEatable && gameState.selectedCellCoord) {
        console.log('handleEatableMove()')
        const { isMoveLegal, state } = isNextStepLegal(gameState, target)

        if (
          (state.isBlackTurn && state.isBlackKingThreatened) ||
          (!state.isBlackTurn && state.isWhiteKingThreatened) ||
          !isMoveLegal
        ) {
          return
        }

        const newState = movePiece(gameState, cellCoord)

        if (!newState) return

        if (isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && (await updateGameState(newState, setGameState))
          setCellCoordsToAddInsteadPawn(cellCoord)
          return
        }
        newState.isBlackTurn = !newState.isBlackTurn
        await updateGameState(newState, setGameState)
        cleanBoard()
      } else if (isSquareCastling && gameState.selectedCellCoord) {
        console.log('handleCastlingMove()')
        const { isMoveLegal } = isNextStepLegal(gameState, target)
        if (!isMoveLegal) return

        const isCastleLegals = doCastling(gameState, target)
        if (isCastleLegals?.newState) {
          isCastleLegals.newState.isBlackTurn =
            !isCastleLegals.newState.isBlackTurn
        }

        if (
          isCastleLegals &&
          isCastleLegals.newState &&
          isCastleLegals.isCastleLegal
        ) {
          await updateGameState(isCastleLegals.newState, setGameState)
        }
        if (isCastleLegals && !isCastleLegals.isCastleLegal) return
        cleanBoard()
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
        console.log('handleStepMove()')
        const { isMoveLegal, state } = isNextStepLegal(gameState, target)
        if (!isMoveLegal) return

        const newState = movePiece(gameState, cellCoord)

        if (newState && !newState?.isGameStarted && !newState?.isGameStarted)
          newState.isGameStarted = true

        if (!newState) return
        if (isPawnStepsEnd(state, cellCoord)) {
          setIsPromotionChoice(true)
          newState && (await updateGameState(newState, setGameState))
          setCellCoordsToAddInsteadPawn(cellCoord)
          return
        }
        newState.isBlackTurn = !newState.isBlackTurn
        await updateGameState(newState, setGameState)

        cleanBoard()
      } else {
        cleanBoard()
        console.log('handlePieceSelection()')
        if (gameState.board[cellCoord.i][cellCoord.j]) {
          target.classList.add('selected')
          setSelectedCellCoord({
            cellCoord,
          })
          const possibleCoords = getPossibleCoords(gameState, piece, cellCoord)
          if (possibleCoords) markCells(gameState, possibleCoords)
        }
      }
    }
  }

  const screenStyle =
    gameState?.players?.black === loggedInUser?._id
      ? 'blackScreen'
      : 'whiteScreen'

  // console.log('rebder Board.tsx')
  return (
    <section className={'board-cmp ' + screenStyle}>
      {isWin && (
        <>
          <span style={{ color: 'white' }}>We have a winner here !'😁</span>
          <button
            onClick={() => {
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
        <ChessBoard
          handleBoardClick={handleBoardClick}
          board={gameState?.board}
        />
      </div>

      {isPromotionChoice && gameState && (
        <PromotionChoice
          onChoosePieceToAdd={onChoosePieceToAdd}
          gameState={gameState}
          cellCoordsToAddInsteadPawn={cellCoordsToAddInsteadPawn}
          updateGameState={updateGameState}
          setIsPromotionChoice={setIsPromotionChoice}
          setGameState={setGameState}
        />
      )}
    </section>
  )
}
