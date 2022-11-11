import { useParams } from 'react-router-dom'
import { Board } from '../cmps/Board'

export const Main = () => {
  const { id } = useParams()
  console.log({ id })

  return (
    <div className="main-page">
      <Board />
    </div>
  )
}
