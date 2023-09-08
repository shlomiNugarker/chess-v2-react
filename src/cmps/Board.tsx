import { PromotionChoice } from './PromotionChoice'

import { GameState } from '../models/GameState'
import { User } from '../models/User'

interface Props {
  isTwoPlayerInTheGame: boolean
  gameState: GameState | null
  loggedInUser: User | null
  updateGameState: (newState: GameState) => Promise<void | GameState>
  setSelectedCellCoord: (cellCoord: GameState['selectedCellCoord']) => void
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
  isWin: boolean
  isPromotionChoice: boolean
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  setCellCoordsToAddInsteadPawn: React.Dispatch<
    React.SetStateAction<{
      i: number
      j: number
    } | null>
  >
  onChoosePieceToAdd: (piece: string) => Promise<void>
}

import { ChatState } from '../models/ChatState'
import { useNavigate } from 'react-router-dom'
import { ChessBoard } from './ChessBoard'
import { cellClicked } from '../services/game/controller/cellClicked'

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
        />
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
