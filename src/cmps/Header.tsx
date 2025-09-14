import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const authContextData = useAuthContext();
  // console.log('render Header.tsx')
  return (
    <header className="flex items-center justify-between h-[60px] px-4 text-secondary" style={{backgroundColor: 'rgba(255, 255, 255, 0.117)'}}>
      <div
        className={`w-full flex justify-between transition-all duration-300 ${
          !isMenuVisible 
            ? "md:flex md:flex-row max-md:flex-col max-md:justify-start max-md:bg-primary max-md:text-xl max-md:absolute max-md:h-[calc(100vh-60px)] max-md:w-screen max-md:top-[60px] max-md:left-[-100vw] max-md:transition-all max-md:duration-500" 
            : "md:flex md:flex-row max-md:flex-col max-md:justify-start max-md:bg-primary max-md:text-xl max-md:absolute max-md:h-[calc(100vh-60px)] max-md:w-screen max-md:top-[60px] max-md:left-0"
        }`}
      >
        <span className="flex items-center justify-center max-md:fixed max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:top-[15px]">
          <Link to={"/"} className="hover:no-underline">Ichess</Link>
        </span>
        <div className="flex max-md:order-2 max-md:flex-col max-md:text-center">
          <ul className="p-0 m-0 flex items-center justify-center max-md:flex-col">
            <li className="list-none px-[0.7rem] max-md:m-0 max-md:py-[15px]">
              <Link to={"/"}>Play</Link>
            </li>
          </ul>
        </div>

        <div className="max-md:order-1 max-md:my-[15px]">
          <div className="flex items-center cursor-pointer max-md:text-center max-md:flex-col">
            {!authContextData?.loggedInUser && (
              <p onClick={() => navigate("/sign-in")}>Sign In</p>
            )}
            {authContextData?.loggedInUser && (
              <span onClick={() => navigate("/profile")}>
                Hello, {authContextData?.loggedInUser.fullname}
              </span>
            )}
            {authContextData?.loggedInUser && (
              <button className="blue-btn !w-auto ml-[5px] !p-[5px]" onClick={authContextData?.logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute right-0 mx-[15px] cursor-pointer text-[40px] hidden max-md:block"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        x
      </div>
    </header>
  );
};
