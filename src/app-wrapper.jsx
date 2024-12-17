import App from 'components/app'
import PrivateRoute from 'components/molecules/private-route'
import LoginPage from 'components/pages/login-page'
import { AuthProvider } from 'providers/auth-provider'
import { ModalProvider } from 'providers/modal-provider'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

require('configs/axios-configs')

const AppWrapper = () => (
  <ModalProvider>
    <AuthProvider>
      <Switch>
        { /* Private Views */ }
        <PrivateRoute path='/app' component={ App }/>

        { /* Public Views */ }
        <Route path="/" component={ LoginPage } />
      </Switch>
    </AuthProvider>
  </ModalProvider>
)

export default AppWrapper
