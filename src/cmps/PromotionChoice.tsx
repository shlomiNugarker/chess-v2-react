import { GameState } from '../models/GameState'

interface props {
  onChoosePieceToAdd: ({ piece }: { piece: string }) => Promise<void>
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
    <div className="fixed">
      <div className="bg-black bg-opacity-40 fixed inset-0 z-[5]"></div>
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-[30px] rounded-[10px] z-10 w-[270px] h-[85px] ${
        gameState?.isBlackTurn 
          ? 'bg-gray-600 bg-opacity-90' 
          : 'bg-white bg-opacity-85'
      }`}>
        {piecesToShow.map((piece) => (
          <span
            key={piece}
            className="inline-block mx-[3px] rounded-[25px] transition-all duration-300 cursor-pointer text-center hover:bg-gray-500 hover:bg-opacity-25"
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
