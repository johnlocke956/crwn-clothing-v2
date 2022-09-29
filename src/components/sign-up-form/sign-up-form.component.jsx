import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => setFormFields(defaultFormFields)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) return

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      let message = 'Failed while creating user'
      if (error.code === 'auth/email-already-in-use')
        message = 'Cannot create user, email already in use'
      console.error(message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(name, value)

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display name</label>
        <input
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type='email'
          required
          name='email'
          value={email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type='password'
          required
          name='password'
          value={password}
          onChange={handleChange}
        />

        <label>Confirm password</label>
        <input
          type='password'
          required
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type='submit'>SIGN UP</button>
      </form>
    </div>
  )
}

export default SignUpForm
