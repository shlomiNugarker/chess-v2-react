import { ChessBoard } from './ChessBoard'

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
export const PuzzleBoard = ({ board, handleBoardClick }: Props) => {
  return <ChessBoard handleBoardClick={handleBoardClick} board={board} />
}
