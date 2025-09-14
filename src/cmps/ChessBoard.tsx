interface Props {
  board: string[][]
  handleBoardClick: (
    ev:
      | React.DragEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number,
    j: number
  ) => void
  isBlackPlayer?: boolean
}

export const ChessBoard = ({ board, handleBoardClick, isBlackPlayer = false }: Props) => {
  // Chess coordinates for display - flip for black player
  const files = isBlackPlayer ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = isBlackPlayer ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1']

  // Create a stable board representation that always renders in the same order
  const stableBoard = []
  for (let i = 0; i < 8; i++) {
    const row = []
    for (let j = 0; j < 8; j++) {
      // Calculate visual position based on player orientation
      const visualI = isBlackPlayer ? 7 - i : i
      const visualJ = isBlackPlayer ? 7 - j : j
      row.push({
        key: `${i}-${j}`,
        piece: board[i][j],
        actualI: i,
        actualJ: j,
        visualI,
        visualJ
      })
    }
    stableBoard.push(row)
  }

  return (
    <div className="chess-board-container">
      {/* Board wrapper with coordinates and shadow */}
      <div className="relative p-4 bg-gradient-to-br from-chess-board-bg to-chess-board-bg/80 rounded-2xl shadow-chess-board backdrop-blur-sm border border-white/10">

        {/* Rank labels (numbers) - left side */}
        <div className="absolute left-1 top-4 flex flex-col justify-between h-[560px] text-text-secondary text-sm font-medium">
          {ranks.map((rank, i) => (
            <div key={rank} className="flex items-center h-chess-cell">
              {rank}
            </div>
          ))}
        </div>

        {/* Rank labels (numbers) - right side */}
        <div className="absolute right-1 top-4 flex flex-col justify-between h-[560px] text-text-secondary text-sm font-medium">
          {ranks.map((rank, i) => (
            <div key={rank + '-right'} className="flex items-center h-chess-cell">
              {rank}
            </div>
          ))}
        </div>

        {/* File labels (letters) - top */}
        <div className="absolute top-1 left-4 flex justify-between w-[560px] text-text-secondary text-sm font-medium">
          {files.map((file) => (
            <div key={file} className="flex justify-center items-center w-chess-cell">
              {file}
            </div>
          ))}
        </div>

        {/* File labels (letters) - bottom */}
        <div className="absolute bottom-1 left-4 flex justify-between w-[560px] text-text-secondary text-sm font-medium">
          {files.map((file) => (
            <div key={file + '-bottom'} className="flex justify-center items-center w-chess-cell">
              {file}
            </div>
          ))}
        </div>

        {/* Chess Board */}
        <div
          className="rounded-lg overflow-hidden shadow-elevated mx-4 my-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
          }}
        >
          {stableBoard.flat().map(({ key, piece, actualI, actualJ, visualI, visualJ }) => (
            <div
              key={`cell-${key}`}
              id={`cell-${actualI}-${actualJ}`}
              className={`
                relative flex justify-center items-center w-chess-cell h-chess-cell
                text-chess-piece transition-all duration-150 ease-in-out
                ${(actualI + actualJ) % 2 === 0 ? 'bg-chess-white' : 'bg-chess-black'}
                ${piece ? 'cursor-pointer' : 'cursor-default'}
              `}
              style={{
                gridColumn: visualJ + 1,
                gridRow: visualI + 1,
              }}
              onDrop={(ev) => {
                ev.preventDefault()
                handleBoardClick(ev, actualI, actualJ)
              }}
              onDragOver={(ev) => {
                ev.preventDefault()
              }}
              draggable="true"
              onMouseDown={(ev) => {
                handleBoardClick(ev, actualI, actualJ)
              }}
            >
              {/* Chess piece - simple rendering */}
              {piece}

              {/* Subtle inner border for better cell definition */}
              <div className="absolute inset-0 border border-black/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
