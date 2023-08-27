import { GameState } from '../models/GameState'

interface Props {
  state: GameState | null
  cellClicked: (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => void
}

export const ChessBoard = ({ state, cellClicked }: Props) => {
  // console.log('render ChessBoard.tsx')
  return (
    <table className={'chess-board'}>
      <tbody>
        {state?.board.map((_tr, i) => (
          <tr key={'tr' + i}>
            {state.board[i].map((piece, j) => (
              <td
                key={i.toString() + j}
                id={`cell-${i}-${j}`}
                className={(i + j) % 2 === 0 ? 'white' : 'black'}
                style={{ cursor: piece && 'pointer' }}
                onDrop={(ev) => {
                  ev.preventDefault()
                  cellClicked(ev, i, j)
                }}
                onDragOver={(ev) => {
                  ev.preventDefault()
                }}
                draggable="true"
                onMouseDown={(ev) => {
                  cellClicked(ev, i, j)
                }}
              >
                {piece}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
