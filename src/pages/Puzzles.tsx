import { PuzzleBoard } from '../cmps/PuzzleBoard'

export const Puzzles = () => {
  // console.log('render Puzzles()')

  const puzzles = [p]

  const handleBoardClick = (
    ev:
      | React.DragEvent<HTMLTableDataCellElement>
      | React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    i: number,
    j: number
  ) => {
    console.log({ ev, i, j })
  }

  return (
    <section>
      <PuzzleBoard handleBoardClick={handleBoardClick} board={puzzles[0]} />
    </section>
  )
}

const p = [
  ['', '', '', '', '♚', '', '', ''],
  ['', '', '', '', '', '', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '♕', '♔', '', '', ''],
]
