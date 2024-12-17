import PropTypes from 'prop-types'
import { useIsAuth } from 'providers/auth-provider'
import React from 'react'
import { Redirect, Route } from 'react-router'


const propTypes = {
  /** Redirected component  */
  component: PropTypes.func
}

/** Checks if a user is logged in via the AuthContext */
const PrivateRoute = ({ component , ...props }) => {

  const isAuth = useIsAuth()
  return (
    <>
      {
        isAuth
          ? <Route { ...props } component={ component } />
          : <Route { ...props }>
            <Redirect to={ '/' }/>
          </Route>
      }
    </>
  )

}

PrivateRoute.propTypes = propTypes

export default PrivateRoute
