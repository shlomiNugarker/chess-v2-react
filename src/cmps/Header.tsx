import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const authContextData = useAuthContext();
  // console.log('render Header.tsx')
  return (
    <header className={"header-cmp"}>
      <div
        className={` ${!isMenuVisible ? "container hide-menu" : "container"}`}
      >
        <span className="logo">
          <Link to={"/"}>Ichess</Link>
        </span>
        <div className="nav">
          <ul>
            <li>
              <Link to={"/"}>Play</Link>
            </li>
          </ul>
        </div>

        <div className="sign-in-container">
          <div className="sign-in">
            {!authContextData?.loggedInUser && (
              <p onClick={() => navigate("/sign-in")}>Sign In</p>
            )}
            {authContextData?.loggedInUser && (
              <span onClick={() => navigate("/profile")}>
                Hello, {authContextData?.loggedInUser.fullname}
              </span>
            )}
            {authContextData?.loggedInUser && (
              <button className="blue-btn" onClick={authContextData?.logout}>
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
  );
};
