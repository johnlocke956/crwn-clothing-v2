import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD29EreLFOadhUaAPpZ44i8opXafuBYBCI",
  authDomain: "crwn-clothing-db-ztm-cf214.firebaseapp.com",
  projectId: "crwn-clothing-db-ztm-cf214",
  storageBucket: "crwn-clothing-db-ztm-cf214.appspot.com",
  messagingSenderId: "746302918271",
  appId: "1:746302918271:web:5b395b249f4cf7b93bf94a"
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log('userDocRef', userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log('userSnapshot', userSnapshot)
  console.log('userSnapshot exists', userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (error) {
      console.error('error creating the user', error.message)
    }
  }

  return userDocRef
}