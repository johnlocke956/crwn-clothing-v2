import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'

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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display name'
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label='Confirm password'
          type='password'
          required
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type='submit'>SIGN UP</Button>
      </form>
    </div>
  )
}

export default SignUpForm
