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
  const blackPieces = [
    { piece: gameState?.pieces.QUEEN_BLACK, name: 'Queen' },
    { piece: gameState?.pieces.ROOK_BLACK, name: 'Rook' },
    { piece: gameState?.pieces.BISHOP_BLACK, name: 'Bishop' },
    { piece: gameState?.pieces.KNIGHT_BLACK, name: 'Knight' },
  ]
  const whitePieces = [
    { piece: gameState?.pieces.QUEEN_WHITE, name: 'Queen' },
    { piece: gameState?.pieces.ROOK_WHITE, name: 'Rook' },
    { piece: gameState?.pieces.BISHOP_WHITE, name: 'Bishop' },
    { piece: gameState?.pieces.KNIGHT_WHITE, name: 'Knight' },
  ]

  const piecesToShow = gameState?.isBlackTurn ? blackPieces : whitePieces

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-background-elevated to-background-secondary rounded-2xl shadow-2xl border border-glass-border p-6 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Pawn Promotion
          </h2>
          <p className="text-text-secondary text-sm">
            Choose a piece to replace your pawn
          </p>
        </div>

        {/* Piece Selection Grid */}
        <div className="grid grid-cols-2 gap-4">
          {piecesToShow.map(({ piece, name }, index) => (
            <button
              key={piece}
              className={`
                group relative flex flex-col items-center justify-center
                w-24 h-24 rounded-xl border-2 transition-all duration-300
                bg-gradient-to-br from-surface-elevated to-surface-secondary
                border-glass-border hover:border-accent-primary
                hover:shadow-glow hover:scale-105 hover:bg-gradient-to-br
                hover:from-accent-primary/10 hover:to-accent-primary/5
                focus:outline-none focus:ring-2 focus:ring-accent-primary/50
                active:scale-95
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideUp 0.4s ease-out forwards',
                opacity: 0
              }}
              onClick={() => onChoosePieceToAdd({ piece })}
            >
              {/* Piece Icon */}
              <span className="text-4xl mb-2 transition-transform duration-200 group-hover:scale-110">
                {piece}
              </span>

              {/* Piece Name */}
              <span className="text-xs text-text-secondary group-hover:text-accent-primary font-medium">
                {name}
              </span>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>

        {/* Footer Hint */}
        <div className="text-center mt-6 text-xs text-text-muted">
          Click on a piece to promote your pawn
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
