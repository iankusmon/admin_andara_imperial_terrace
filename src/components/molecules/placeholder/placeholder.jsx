import PropTypes from 'prop-types'
import React from 'react'
import { useLocation } from 'react-router'
import { Card } from 'reactstrap'

const propTypes = {
  title: PropTypes.string
}

const Placeholder = ({ title }) => {
  const location = useLocation()
  return (
    <Card body>
      <h1>{ title || 'Placeholder View' }</h1>
      <code>location.pathname: { location.pathname }</code>
    </Card>
  )
}

Placeholder.propTypes = propTypes

export default Placeholder