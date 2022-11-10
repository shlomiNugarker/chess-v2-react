import { Link } from 'react-router-dom'

export const SignIn = () => {
  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }
  return (
    <div className="sign-in-page">
      <div className="container">
        <form onSubmit={submit} action="">
          <div>
            <h1>Sign in</h1>
          </div>
          <div>
            <label htmlFor="userName">
              <p>User name or email</p>
              <input type="text" id="userName" />
            </label>
          </div>
          <div>
            <label htmlFor="userPassword">
              <p>Password</p>
              <input type="password" id="userPassword" />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="bottom-btns">
          <Link to={'/sign-up'}>Sign up</Link>
          <Link to={'/sign-up'}>Reset password</Link>
          <Link to={'/sign-up'}>Login by email</Link>
        </div>
      </div>
    </div>
  )
}
