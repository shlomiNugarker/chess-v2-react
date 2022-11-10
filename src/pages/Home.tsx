import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <Link to={'/main'}>play with friend</Link>
      </div>
    </div>
  )
}
