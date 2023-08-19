import { ChessBoard } from '../cmps/ChessBoard'

export const Puzzles = () => {
  const cellClicked = (
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    console.log(ev, i, j)
  }
  return (
    <div className="puzzles-page">
      <ChessBoard state={null} cellClicked={cellClicked} />
    </div>
  )
}
