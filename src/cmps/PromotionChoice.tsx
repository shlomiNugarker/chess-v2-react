import { GameState } from '../models/GameState'
import { OnChoosePieceToAdd } from '../models/OnChoosePieceToAdd'

interface props {
  onChoosePieceToAdd: OnChoosePieceToAdd
  updateGameState: (newState: GameState) => Promise<void>
  gameState: GameState
  cellCoordsToAddInsteadPawn: {
    i: number
    j: number
  } | null

  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
}

export const PromotionChoice = ({ onChoosePieceToAdd, gameState }: props) => {
  const blackPieces: string[] = [
    gameState?.pieces.QUEEN_BLACK,
    gameState?.pieces.KNIGHT_BLACK,
    gameState?.pieces.BISHOP_BLACK,
    gameState?.pieces.ROOK_BLACK,
  ]
  const whitePieces: string[] = [
    gameState?.pieces.QUEEN_WHITE,
    gameState?.pieces.KNIGHT_WHITE,
    gameState?.pieces.BISHOP_WHITE,
    gameState?.pieces.ROOK_WHITE,
  ]

  const piecesToShow = gameState?.isBlackTurn ? blackPieces : whitePieces
  // console.log('render PromotionChoice.tsx')
  return (
    <div className="promotion-choice">
      <div className="bg"></div>
      <div className={gameState?.isBlackTurn ? 'pieces black' : 'pieces white'}>
        {piecesToShow.map((piece) => (
          <span
            key={piece}
            className="piece"
            onClick={() =>
              onChoosePieceToAdd({
                piece,
              })
            }
          >
            {piece}
          </span>
        ))}
      </div>
    </div>
  )
}
