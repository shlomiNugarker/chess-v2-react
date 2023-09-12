export function paintKingCellToRed(kingPos: { i: number; j: number }) {
  console.log('paintKingCellToRed()')

  document
    .querySelector(`#cell-${kingPos.i}-${kingPos.j}`)
    ?.classList.add('red')
}
