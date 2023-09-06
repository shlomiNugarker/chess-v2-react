import { useEffect } from 'react'
import { ChessBoard } from '../cmps/ChessBoard'

export const Puzzles = () => {
  // console.log('render Puzzles()')

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(() => {})()
    return () => {}
  }, [])

  return (
    <section>
      <ChessBoard state={null} cellClicked={() => console.log()} />
    </section>
  )
}
