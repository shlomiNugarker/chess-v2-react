import { cloneDeep } from 'lodash'
import { addPieceInsteadPawn } from './addPieceInsteadPawn'
import { buildBoard } from './buildBoard'
import { doCastling } from './doCastling'
import { doRandomMove } from './doRandomMove'
import { gPieces } from './gPieces'
import { getCellCoord } from './getCellCoord'
import { getPossibleCoords } from './getPossibleCoords'
import { isBlackPiece } from './isBlackPiece'
import { isCastleThreatened } from './isCastleThreatened'
import { isColorPieceWorthCurrPlayerColor } from './isColorPieceWorthCurrPlayerColor'
import { isEmptyCell } from './isEmptyCell'
import { isNextStepLegal } from './isNextStepLegal'
import { isOptionToCastling } from './isOptionToCastling'
import { isPawnStepsEnd } from './isPawnStepsEnd'
import { isPlayerWin } from './isPlayerWin'
import { movePiece } from './movePiece'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKing } from './possibleCoordsFuncs/getAllPossibleCoordsKing'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsPawn } from './possibleCoordsFuncs/getAllPossibleCoordsPawn'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'
import { getAllPossibleKingCoordsToGetEatenPawn } from './possibleCoordsFuncs/getAllPossibleKingCoordsToGetEatenPawn'
import { updateKingPos } from './updateKingPos'
import { checkIfKingThreatened } from './checkIfKingThreatened'

export const chess = {
  gPieces,
  cloneDeep,
  buildBoard,
  getAllPossibleCoordsBishop,
  getAllPossibleCoordsKing,
  getAllPossibleCoordsKnight,
  getAllPossibleCoordsPawn,
  getAllPossibleCoordsQueen,
  getAllPossibleCoordsRook,
  getAllPossibleKingCoordsToGetEatenPawn,
  addPieceInsteadPawn,
  doCastling,
  doRandomMove,
  getCellCoord,
  getPossibleCoords,
  isBlackPiece,
  isCastleThreatened,
  isColorPieceWorthCurrPlayerColor,
  isEmptyCell,
  isNextStepLegal,
  isOptionToCastling,
  isPawnStepsEnd,
  isPlayerWin,
  movePiece,
  updateKingPos,
  checkIfKingThreatened,
}
