import AdminsApiV2 from 'api/v2/admins-api-v2'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Spinner } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.any
}

// Only for "Global Application State"
const initialAuthData = {
  isAuth    : false,
  isLoading : true,
  user      : {
    name   : '',
    access : ''
  },
  setAuth: () => {}
}

const AuthContext = React.createContext(initialAuthData)

export const AuthProvider = ({ children }) => {
  const history                     = useHistory()
  const [ isAuth, setAuth ]         = useState(initialAuthData.isAuth)
  const [ isLoading, setIsLoading ] = useState(initialAuthData.isLoading)
  const [ user, setUser ]           = useState(initialAuthData.user)

  useEffect(() => {

    // Executed when eventListener on 'storate' fires
    // Redirect user to index on all open tabs
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        history.push('/')
      }
    }
    // to listen to a logout event happening in local/session storage
    window.addEventListener('storage', syncLogout)
    // cookie _session_id is HTTP only
    // Need another way for client to check if Customer is logged in
    AdminsApiV2.profile()
      .then((response) => {
        const admin = response.data.admin
        setAuth(response.status === 200)
        setUser({
          name : admin.name,
          role : admin.access
        })
        setIsLoading(false)
      })
      .catch(() => {
        // Does not check equality to status to handle
        // when rails server is not found by axios.
        setAuth(false)
        setIsLoading(false)
      })

    return () => {
      // remove the eventListener when component dismounts
      window.removeEventListener('storage', syncLogout)
    }
  }, [ history ])


  // Call after User successfully logs out
  const onLogout = () => {
    setAuth(false)
    setUser(undefined)
    localStorage.setItem(localStorage.LOGOUT, Date.now())
  }

  // Call after User successfully logs in
  const onLogin = (user) => {
    setAuth(true)
    setUser(user)
  }

  if (isLoading) return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position : 'absolute',
        width    : '100%',
        height   : '100%'
      }}
    >
      <Spinner color='primary'/>
    </div>
  )

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        user,
        onLogin,
        onLogout
      }}
    >
      { children }
    </AuthContext.Provider>
  )

}

/**
 * Hook to be used in components to return auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Hook to be used in components to return if customer is logged in
 */
export const useIsAuth = () => {
  const context = useAuth()
  return context.isAuth
}

AuthProvider.propTypes = propTypes
