import { utilsService } from '../services/utilService'

export const Board = () => {
  const board = utilsService.buildBoard()

  const cellClicked = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    if (ev.target instanceof Element) {
      console.log(i, j, ev.target)
    }
  }

  return (
    <section className="board-cmp">
      <table>
        <tbody>
          {board.map((tr, i) => (
            <tr key={'tr' + i}>
              {board[i].map((td, j) => (
                <td
                  key={i + j}
                  id={`cell-${i}-${j}`}
                  className={(i + j) % 2 === 0 ? 'white' : 'black'}
                  onClick={(ev) => cellClicked(ev, i, j)}
                >
                  {board[i][j]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
