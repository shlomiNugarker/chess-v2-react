import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const authContextData = useAuthContext();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-surface-glass border-b border-glass-border animate-fade-in">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-text-primary hover:text-accent-primary transition-colors duration-200 hover:no-underline"
            >
              ♔ iChess
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
            >
              Play
            </Link>
            <Link
              to="/puzzles"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
            >
              Puzzles
            </Link>
            <Link
              to="/about"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
            >
              About
            </Link>
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!authContextData?.loggedInUser ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/sign-in")}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="bg-accent-primary hover:bg-accent-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-glow"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2 cursor-pointer hover:text-accent-primary transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {authContextData.loggedInUser.fullname?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-text-secondary hover:text-text-primary transition-colors duration-200">
                    {authContextData.loggedInUser.fullname}
                  </span>
                </div>
                <button
                  onClick={authContextData?.logout}
                  className="bg-surface-elevated hover:bg-surface-elevated/80 text-text-secondary hover:text-text-primary px-3 py-2 rounded-lg transition-all duration-200 border border-glass-border"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-surface-elevated border border-glass-border hover:bg-surface-elevated/80 transition-colors duration-200"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <div className="space-y-1">
              <div className={`w-5 h-0.5 bg-text-primary transition-transform duration-300 ${isMenuVisible ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-text-primary transition-opacity duration-300 ${isMenuVisible ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`w-5 h-0.5 bg-text-primary transition-transform duration-300 ${isMenuVisible ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden absolute top-16 left-0 right-0 backdrop-blur-md bg-surface-glass border-b border-glass-border
        transition-all duration-300 ease-in-out
        ${isMenuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="container mx-auto px-4 py-6 space-y-4">

          {/* Mobile Navigation Links */}
          <div className="space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuVisible(false)}
              className="block text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
            >
              Play
            </Link>
            <Link
              to="/puzzles"
              onClick={() => setIsMenuVisible(false)}
              className="block text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
            >
              Puzzles
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuVisible(false)}
              className="block text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
            >
              About
            </Link>
          </div>

          {/* Mobile User Actions */}
          <div className="border-t border-glass-border pt-4">
            {!authContextData?.loggedInUser ? (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    navigate("/sign-in")
                    setIsMenuVisible(false)
                  }}
                  className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/sign-up")
                    setIsMenuVisible(false)
                  }}
                  className="block w-full bg-accent-primary hover:bg-accent-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 text-center"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  onClick={() => {
                    navigate("/profile")
                    setIsMenuVisible(false)
                  }}
                  className="flex items-center space-x-3 cursor-pointer hover:text-accent-primary transition-colors duration-200 py-2"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {authContextData.loggedInUser.fullname?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-text-primary font-medium">
                    {authContextData.loggedInUser.fullname}
                  </span>
                </div>
                <button
                  onClick={() => {
                    authContextData?.logout()
                    setIsMenuVisible(false)
                  }}
                  className="block w-full bg-surface-elevated hover:bg-surface-elevated/80 text-text-secondary hover:text-text-primary px-4 py-3 rounded-lg transition-all duration-200 border border-glass-border text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
