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
import { PromotionChoice } from './PromotionChoice'
import { isPawnStepsEnd } from '../services/game/isPawnStepsEnd'
import { addPieceInsteadPawn } from '../services/game/addPieceInsteadPawn'
import { setSelectedCellCoord, setSwitchTurn } from '../features/game/gameSlice'
import { updateState } from '../features/game/asyncActions'

interface props {
  isTwoPlayerInTheGame: boolean
  setIsTwoPlayerInTheGame: React.Dispatch<React.SetStateAction<boolean>>
}

var audioStep = new Audio(require('../assets/sound/step.mp3'))

export const Board = ({ isTwoPlayerInTheGame }: props) => {
  const dispatch = useAppDispatch()

  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)

  const [isPromotionChoice, setIsPromotionChoice] = useState(false)

  const [cellCoordsToAddInsteadPawn, setCellCoordsToAddInsteadPawn] = useState<{
    i: number
    j: number
  } | null>(null)

  function onChoosePieceToAdd(piece: string) {
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

  const cellClicked = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (gameState?.isOnline && !isTwoPlayerInTheGame) return

    if (
      gameState?.isOnline &&
      gameState?.isBlackTurn &&
      authState.loggedInUser?._id !== gameState.players?.black
    )
      return
    if (
      gameState?.isBlackTurn === false &&
      authState.loggedInUser?._id !== gameState.players?.white
    )
      return

    if (ev.target instanceof Element && gameState) {
      const cellCoord = { i, j }
      const piece = gameState.board[i][j]
      const isSquareSelected = ev.target.classList.contains('selected')
      const isSquareMarked = ev.target.classList.contains('mark')
      const isSquareEatable = ev.target.classList.contains('eatable')
      const isSquareCastling = ev.target.classList.contains('castle')

      // if it's possible to eat:
      if (isSquareEatable && gameState.selectedCellCoord) {
        let { isMoveLegal, state } = isNextStepLegal(gameState, ev.target)

        if (state.isBlackTurn && state.isBlackKingThreatened) return
        if (!state.isBlackTurn && state.isWhiteKingThreatened) return
        if (!isMoveLegal) return

        const newState = movePiece(gameState, cellCoord)
        audioStep.play()
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
        return
      }

      // if it's possible to castling:
      if (isSquareCastling && gameState.selectedCellCoord) {
        const { isMoveLegal } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return

        const isCastleLegals = doCastling(gameState, ev.target)
        audioStep.play()
        isCastleLegals &&
          isCastleLegals.newState &&
          isCastleLegals.isCastleLegal &&
          dispatch(updateState(isCastleLegals.newState))

        if (isCastleLegals && !isCastleLegals.isCastleLegal) return

        onSwitchTurn()
        cleanBoard()
        return
      }

      if (!isColorPieceWorthCurrPlayerColor(gameState, piece) && piece !== '')
        return

      // unselect
      if (isSquareSelected) {
        ev.target.classList.remove('selected')
        cleanBoard()
        return
      }

      // if it's possible to step:
      if (isSquareMarked && gameState.selectedCellCoord) {
        const { isMoveLegal, state } = isNextStepLegal(gameState, ev.target)
        if (!isMoveLegal) return

        const newState = movePiece(gameState, cellCoord)
        audioStep.play()
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

  const onSwitchTurn = () => {
    dispatch(setSwitchTurn())
  }

  const screenStyle =
    gameState?.players?.black === authState?.loggedInUser?._id
      ? 'blackScreen'
      : 'whiteScreen'

  return (
    <section className={'board-cmp ' + screenStyle}>
      <div>
        <table>
          <tbody>
            {gameState &&
              gameState.board.map((tr, i) => (
                <tr key={'tr' + i}>
                  {gameState.board[i].map((td, j) => (
                    <td
                      key={i + j}
                      id={`cell-${i}-${j}`}
                      className={(i + j) % 2 === 0 ? 'white' : 'black'}
                      onClick={(ev) => cellClicked(ev, i, j)}
                      style={{ cursor: gameState.board[i][j] && 'pointer' }}
                    >
                      {gameState.board[i][j]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
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
