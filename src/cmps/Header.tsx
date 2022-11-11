import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../features'
import { logout, signUp } from '../features/auth/asyncActions'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'

export const Header = (props: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const { loggedInUser } = useAppSelector((state: RootState) => state.auth)

  const onLogout = () => dispatch(logout())

  console.log({ loggedInUser })

  return (
    <header className="header-cmp">
      <div
        className={` ${!isMenuVisible ? 'container hide-menu' : 'container'}`}
      >
        <span className="logo">chess logo</span>
        <div className="nav">
          <ul>
            <li>Play</li>

            <li>Puzzles</li>

            <li>Learn</li>

            <li>Watch</li>

            <li>Community</li>

            <li>Tools</li>
          </ul>
        </div>

        <div className="sign-in-container">
          <div className="sign-in">
            <p onClick={() => navigate('/sign-in')}>Sign In</p>

            <p onClick={onLogout}>Logout</p>
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
