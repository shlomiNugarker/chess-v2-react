import { GameState } from '../../../models/GameState'

export function isEmptyCell(
  board: string[][],
  coord: { i: number; j: number },
  pieces: GameState['pieces']
) {
  // console.log('isEmptyCell()')
  return board[coord.i][coord.j] === pieces.EMPTY
}
