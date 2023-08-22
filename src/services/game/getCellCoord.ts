export function getCellCoord(strCellId: string) {
  console.log('getCellCoord()')

  const parts = strCellId.split('-')
  const coord = { i: +parts[1], j: +parts[2] }
  return coord
}
