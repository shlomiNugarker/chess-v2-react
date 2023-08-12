import React from 'react'
import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'

interface props {
  onChoosePieceToAdd: any
}

export const PromotionChoice = ({ onChoosePieceToAdd }: props) => {
  const gameState = useAppSelector((state: RootState) => state.game)

  const blackPieces = [
    gameState?.pieces.QUEEN_BLACK,
    gameState?.pieces.KNIGHT_BLACK,
    gameState?.pieces.BISHOP_BLACK,
    gameState?.pieces.ROOK_BLACK,
  ]
  const whitePieces = [
    gameState?.pieces.QUEEN_WHITE,
    gameState?.pieces.KNIGHT_WHITE,
    gameState?.pieces.BISHOP_WHITE,
    gameState?.pieces.ROOK_WHITE,
  ]

  const piecesToShow = gameState?.isBlackTurn ? blackPieces : whitePieces
  return (
    <div className="promotion-choice">
      <div className="bg"></div>
      <div className={gameState?.isBlackTurn ? 'pieces black' : 'pieces white'}>
        {piecesToShow.map((piece: any) => (
          <span
            key={piece}
            className="piece"
            onClick={() => onChoosePieceToAdd(piece)}
          >
            {piece}
          </span>
        ))}
      </div>
    </div>
  )
}
