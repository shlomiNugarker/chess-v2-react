import { Link } from 'react-router-dom'
import { RootState } from '../features'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'

export const Home = () => {
  const authState = useAppSelector((state: RootState) => state.auth)

  const playOffline = () => {
    console.log('playOffline')
  }

  return (
    <div className="home-page">
      <div className="container">
        <pre>{JSON.stringify(authState, null, 2)}</pre>
        <Link to={'/main'}>play with friend</Link>
        <p onClick={playOffline}>play offline with friend</p>
      </div>
    </div>
  )
}
