import { PromotionChoice } from './PromotionChoice'

import { GameState } from '../models/GameState'
import { User } from '../models/User'

interface Props {
  isTwoPlayerInTheGame: boolean
  gameState: GameState | null
  loggedInUser: User | null
  updateGameState: UpdateGameState
  setSelectedCellCoord: (cellCoord: GameState['selectedCellCoord']) => void
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

import { ChatState } from '../models/ChatState'
import { useNavigate } from 'react-router-dom'
import { ChessBoard } from './ChessBoard'
import { cellClicked } from '../services/game/controller/cellClicked'
// import { UpdateGameState } from '../models/UpdateGameState'
import { OnChoosePieceToAdd } from '../models/OnChoosePieceToAdd'
import { UpdateGameState } from '../models/UpdateGameState'

export const Board = ({
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
          isTwoPlayerInTheGame={isTwoPlayerInTheGame}
          state={gameState}
          cellClicked={cellClicked}
          setCellCoordsToAddInsteadPawn={setCellCoordsToAddInsteadPawn}
          updateGameState={updateGameState}
          setIsPromotionChoice={setIsPromotionChoice}
          setSelectedCellCoord={setSelectedCellCoord}
          setGameState={setGameState}
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
