import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './SignupForm.module.css'
import * as authService from '../../services/authService'

class SignupForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  }

  handleChange = e => {
    this.props.updateMessage('')
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = async e => {
    const { history, updateMessage, handleSignupOrLogin } = this.props
    e.preventDefault()
    try {
      await authService.signup(this.state)
      handleSignupOrLogin()
      history.push('/')
    } catch (err) {
      updateMessage(err.message)
    }
  }

  isFormInvalid() {
    const { name, email, password, passwordConf } = this.state
    return !(name && email && password === passwordConf)
  }

  render() {
    const { name, email, password, passwordConf } = this.state
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={styles.container}
      >
      <div class="container text-sm mx-auto max-w-md ">
        <div class="p-1 bg-white rounded-xl py-3">
          <div class="m-3 fs-4 text-center">
            Sign up
          </div>
          <div class="mb-6">      
          <label htmlFor="name" class="ml-4 text-sm mr-4 font-bold inline-block mb-1">
                Name
          </label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={name}
            name="name"
            onChange={this.handleChange}
            class="border bg-gray-100 py-2 px-4 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" class="ml-4 mr-4 font-bold inline-block mb-2">Email</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={this.handleChange}
            class="border bg-gray-100 py-2 px-4 outline-none focus:ring-2 focus:ring-indigo-400 rounded"

          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" class="ml-4 mr-4 font-bold inline-block mb-2">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            name="password"
            onChange={this.handleChange}
            class="border bg-gray-100 py-2 px-4 ml outline-none focus:ring-2 focus:ring-indigo-400 rounded"

          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confirm" class="ml-4 mr-4 font-bold inline-block mb-2">Confirm Password</label>
          <input
            type="password"
            autoComplete="off"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={this.handleChange}
            class="border bg-gray-100 py-2 px-4  outline-none focus:ring-2 focus:ring-indigo-400 rounded"

          />
        </div>
        <div className="inline-block">
          <button disabled={this.isFormInvalid()} class="w-40 text-indigo-50 font-bold bg-indigo-600 ml-5 py-2 rounded-md hover:bg-indigo-500 transition duration-300">Sign Up</button>
          
            <a href='/'>
            <button class="w-40 text-indigo-50 font-bold bg-yellow-600 py-2 rounded-md hover:bg-indigo-500 transition duration-300">Cancel</button>
            </a>
        </div>
      </div>
      </div>
      </form>
    )
  }
}

export default SignupForm
