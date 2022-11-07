export function isEmptyCell(
  board: string[][],
  coord: { i: number; j: number }
) {
  return board[coord.i][coord.j] === ''
}
