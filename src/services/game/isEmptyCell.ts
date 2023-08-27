export function isEmptyCell(
  board: string[][],
  coord: { i: number; j: number }
) {
  // console.log('isEmptyCell()')
  return board[coord.i][coord.j] === ''
}
