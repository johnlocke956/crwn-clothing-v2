import { useState } from 'react'
// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => setFormFields(defaultFormFields)

  /*
  signInWithGoogleRedirect allows to stay in the page without any popup, the useEffect is encessary because the component will unmount after redirecting the page

  useEffect(() => {
    async function getRed() {
      const response = await getRedirectResult(auth)
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user)
      }
    }
    getRed()
  }, [])
  */

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    await createUserDocumentFromAuth(response.user)
    console.log('sign in with google', response)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log('response', response)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password!')
          break
        case 'auth/user-not-found':
          alert('No user associated with this e-mail!')
          break
        default:
          console.error(error)
          break
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(name, value)

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className='buttons-container'>
          <Button type='submit'>SIGN IN</Button>
          <Button buttonType='google' type='button' onClick={logGoogleUser}>
            GOOGLE SIGN IN
          </Button>
        </div>

        {/* TEST BUTTONS*/}
        {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
        {/* {<button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect </button>} */}
      </form>
    </div>
  )
}

export default SignInForm
