// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
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
    const userDocRef = await createUserDocumentFromAuth(response.user)
    console.log('sign in with google', response)
    console.log('userDocRef', userDocRef)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* {<button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect </button>} */}

      <SignUpForm />
    </div>
  )
}

export default SignIn
