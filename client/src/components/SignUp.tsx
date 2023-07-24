import React from 'react'
import { Link } from 'react-router-dom'
const SignUpForm = () => {
  const [state, setState] = React.useState({
    name: '',
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

    const { name, email, password } = state
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    )

    for (const key in state) {
      setState({
        ...state,
        [key]: ''
      })
    }
  }

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
