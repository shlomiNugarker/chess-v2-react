import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export const Header = () => {
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const { loggedInUser, logout } = useAuthContext()

  return (
    <header className={'header-cmp'}>
      <div
        className={` ${!isMenuVisible ? 'container hide-menu' : 'container'}`}
      >
        <span className="logo">
          <Link to={'/'}>Ichess</Link>
        </span>
        <div className="nav">
          <ul>
            <li>
              <Link to={'/'}>Play</Link>
            </li>

            <li>
              <Link to={'/puzzles'}>Puzzles</Link>
            </li>

            <li>
              <Link to={'/'}>Learn</Link>
            </li>

            <li>
              <Link to={'/'}>Watch</Link>
            </li>

            <li>
              <Link to={'/'}>Community</Link>
            </li>

            <li>
              <Link to={'/'}>Tools</Link>
            </li>
          </ul>
        </div>

        <div className="sign-in-container">
          <div className="sign-in">
            {!loggedInUser && (
              <p onClick={() => navigate('/sign-in')}>Sign In</p>
            )}
            {loggedInUser && (
              <span onClick={() => navigate('/profile')}>
                Hello, {loggedInUser.fullname}
              </span>
            )}
            {loggedInUser && (
              <button className="blue-btn" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="menu-btn hide"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        x
      </div>
    </header>
  )
}
