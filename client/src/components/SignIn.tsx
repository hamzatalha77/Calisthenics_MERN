import React from 'react'
import { Link } from 'react-router-dom'
const SignInForm = () => {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })
  const handleChange = (e: any) => {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault()

    const { email, password } = state
    alert(`You are login with email: ${email} and password: ${password}`)

    for (const key in state) {
      setState({
        ...state,
        [key]: ''
      })
    }
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <Link to="/" className="social">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link to="/" className="social">
            <i className="fab fa-google-plus-g" />
          </Link>
          <Link to="/" className="social">
            <i className="fab fa-linkedin-in" />
          </Link>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link to="/">Forgot your password?</Link>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignInForm
