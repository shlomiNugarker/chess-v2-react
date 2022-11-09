import { useState } from 'react'

export const Header = (props: any) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

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
            <p>Sign In</p>
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
