import { GameState } from '../../../models/GameState'
import { isColorPieceWorthCurrPlayerColor } from '../isColorPieceWorthCurrPlayerColor'

export function markCells(
  state: GameState,
  coords: { i: number; j: number }[]
) {
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    const elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    if (!elCell) return

    const piece = state.board[coord.i][coord.j]

    if (isColorPieceWorthCurrPlayerColor(state, piece)) {
      elCell.classList.add('castle')
    }
    //
    else if (state.board[coord.i][coord.j]) {
      elCell.classList.add('eatable')
    }
    //
    else {
      elCell.innerHTML = '<span class="span"></span>'
      elCell.classList.add('mark')
    }
  }
}
