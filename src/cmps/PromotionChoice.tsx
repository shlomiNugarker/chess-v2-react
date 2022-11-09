import React from 'react'
import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'

interface props {
  setIsPromotionChoice: React.Dispatch<React.SetStateAction<boolean>>
  onChoosePieceToAdd: any
}

export const PromotionChoice = ({
  setIsPromotionChoice,
  onChoosePieceToAdd,
}: props) => {
  const { pieces, isBlackTurn } = useAppSelector(
    (state: RootState) => state.game
  )

  const blackPieces = [
    pieces.QUEEN_BLACK,
    pieces.KNIGHT_BLACK,
    pieces.BISHOP_BLACK,
    pieces.ROOK_BLACK,
  ]
  const whitePieces = [
    pieces.QUEEN_WHITE,
    pieces.KNIGHT_WHITE,
    pieces.BISHOP_WHITE,
    pieces.ROOK_WHITE,
  ]

  const piecesToShow = isBlackTurn ? blackPieces : whitePieces
  return (
    <div className="promotion-choice">
      <div className="bg"></div>
      <div className={isBlackTurn ? 'pieces black' : 'pieces white'}>
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
