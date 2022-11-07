export function paintKingCellToRed(kingPos: { i: number; j: number }) {
  document
    .querySelector(`#cell-${kingPos.i}-${kingPos.j}`)
    ?.classList.add('red')
}
