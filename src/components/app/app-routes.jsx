import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

const propTypes = {
  routes    : PropTypes.array,
  pageUtils : PropTypes.object
}

const AppRoutes = ({ routes, pageUtils }) => {

  const renderRoutes = (routes) => (
    routes.map((route, key) => {
      if (route.collapse) {
        return renderRoutes(route.views)
      }
      if (route.layout === '/app') {
        const Component = route.component
        return (
          <Route
            key={ key }
            exact={ true }
            path={ route.layout + route.path }
            render={ (props) => <Component pageUtils={ pageUtils } { ...props } /> }
          />
        )
      }
      else return null
    })
  )

  return (
    <Switch>
      { renderRoutes(routes) }
    </Switch>
  )
}

AppRoutes.propTypes = propTypes

export default AppRoutes
