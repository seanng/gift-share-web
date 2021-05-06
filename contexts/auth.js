/** @see https://github.com/leerob/fastfeedback/blob/master/lib/auth.js */

import { useState, useContext, createContext } from 'react'
import firebase from 'lib/firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

function useProvideAuth() {
  const [user, setUser] = useState(null)
  // const [loading, setLoading] = useState(true)

  const signinAnonymously = () => {
    return firebase
      .auth()
      .signInAnonymously()
      .then(async (response) => {
        console.log('response: ', response)
        console.log('response.user?: ', response.user)
        // 1. format user
        const formattedUser = await formatUser(response.user)
        // 2. set user to formatted user
        setUser(formattedUser)
        // 3. set cookie?
        // 4. return user
        return formattedUser
      })
  }

  return {
    user,
    // loading,
    signinAnonymously,
  }
}

const formatUser = async (user) => {
  // const token = await user.getIdToken()
  // return {
  //   uid: user.uid,
  //   email: user.email,
  //   name: user.displayName,
  //   provider: user.providerData[0].providerId,
  //   photoUrl: user.photoURL,
  //   token,
  // }
  return user
}
