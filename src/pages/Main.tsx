import { useNavigate, useParams } from 'react-router-dom'
import { Board } from '../cmps/Board'
import { RootState } from '../features'
import { useAppSelector } from '../hooks/useTypedSelector'

export const Main = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const gameState = useAppSelector((state: RootState) => state.game)

  return (
    <div className="main-page">
      {gameState && <Board />}

      {!gameState && (
        <div className="msg">
          <p>Did not found a game..</p>
          <button onClick={() => navigate('/')}>Go home</button>
        </div>
      )}
    </div>
  )
}
