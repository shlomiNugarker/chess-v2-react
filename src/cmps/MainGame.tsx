import { useNavigate } from 'react-router-dom'
import { ChessBoard } from './ChessBoard'
import { PromotionChoice } from './PromotionChoice'
import { User } from '../models/User'
import { ChatState } from '../models/ChatState'
import { GameState } from '../models/GameState'

interface Props {
  isTwoPlayerInTheGame: boolean
  gameState: GameState | null
  loggedInUser: User | null
  updateGameState: (newState: GameState) => Promise<void>
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
  isWin: boolean
  isPromotionChoice: boolean
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  //
  cellCoordsToAddInsteadPawn: {
    i: number
    j: number
  } | null
  //
  onChoosePieceToAdd: ({ piece }: { piece: string }) => Promise<void>
  handleBoardClick: (
    ev:
      | React.DragEvent<HTMLTableDataCellElement>
      | React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => Promise<void>
}

export const MainGame = ({
  gameState,
  loggedInUser,
  updateGameState,
  setGameState,
  setChatState,
  isWin,
  isPromotionChoice,
  setIsPromotionChoice,
  onChoosePieceToAdd,
  cellCoordsToAddInsteadPawn,
  handleBoardClick,
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
        {gameState?.board && (
          <ChessBoard
            handleBoardClick={handleBoardClick}
            board={gameState.board}
          />
        )}
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
