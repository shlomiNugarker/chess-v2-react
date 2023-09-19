interface Props {
  board: string[][]
  handleBoardClick: (
    ev:
      | React.DragEvent<HTMLTableDataCellElement>
      | React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => void
}

export const ChessBoard = ({ board, handleBoardClick }: Props) => {
  // console.log('render ChessBoard.tsx')
  return (
    <table className={'chess-board'}>
      <tbody>
        {board.map((_tr, i) => (
          <tr key={'tr' + i}>
            {board[i].map((piece, j) => (
              <td
                key={i.toString() + j}
                id={`cell-${i}-${j}`}
                className={(i + j) % 2 === 0 ? 'white' : 'black'}
                style={{ cursor: piece && 'pointer' }}
                onDrop={(ev) => {
                  ev.preventDefault()
                  handleBoardClick(ev, i, j)
                }}
                onDragOver={(ev) => {
                  ev.preventDefault()
                }}
                draggable="true"
                onMouseDown={(ev) => {
                  handleBoardClick(ev, i, j)
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
