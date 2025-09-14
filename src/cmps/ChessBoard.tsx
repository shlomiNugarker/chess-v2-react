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
    <table className="border-separate border-spacing-0 bg-chess-board-bg">
      <tbody>
        {board.map((_tr, i) => (
          <tr key={'tr' + i} className="flex">
            {board[i].map((piece, j) => (
              <td
                key={i.toString() + j}
                id={`cell-${i}-${j}`}
                className={`
                  flex justify-center items-center w-chess-cell h-chess-cell 
                  text-chess-piece chess-cell-transition
                  ${(i + j) % 2 === 0 ? 'bg-chess-white' : 'bg-chess-black'}
                  ${piece ? 'cursor-pointer' : ''}
                `}
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
