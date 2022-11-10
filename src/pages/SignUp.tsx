import { Link } from 'react-router-dom'

export const SignUp = () => {
  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }

  return (
    <div className="sign-up-page">
      <div className="container">
        <form onSubmit={submit} action="">
          <div>
            <h1>Sign up</h1>
          </div>
          <div>
            <label htmlFor="userName">
              <p>User name </p>
              <input type="text" id="userName" />
            </label>
          </div>
          <div>
            <label htmlFor="userEmail">
              <p>Email</p>
              <input type="email" id="userEmail" />
            </label>
          </div>
          <div>
            <label htmlFor="userPassword">
              <p>Password</p>
              <input type="password" id="userPassword" />
            </label>
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>

        <div className="bottom-btns">
          <Link to={'/sign-in'}>Sign in</Link>
          <Link to={'/sign-in'}>Reset password</Link>
          <Link to={'/sign-in'}>Login by email</Link>
        </div>
      </div>
    </div>
  )
}
