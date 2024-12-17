import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  header   : PropTypes.string,
  isOpen   : PropTypes.bool,
  children : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
}

const defaultProps = {
  isOpen: false
}

/**
 * Collapse particular section on the UI
 * @param {string} header - Collapse header
 * @param {bool} isOpen - initial value whether it should open or collapse
 * @param {string, node} children - collapsible body
 */
const Collapsible = ({
  header,
  isOpen,
  children
}) => {

  const [ active, setActive ] = useState(isOpen)

  return (
    <>
      <div className="font-weight-bold">
        <div onClick={ () => setActive(!active) }>
          <div style={{ cursor: 'pointer' }} className="d-flex justify-content-between">
            <p>{ header }</p>
            <span>
              {
                active ?
                  <i className="fas fa-angle-up" /> :
                  <i className="fas fa-angle-down" />
              }
            </span>
          </div>
        </div>
      </div>
      <div>
        <Collapse isOpen={ active }>
          { children }
        </Collapse>
      </div>
    </>
  )
}

Collapsible.propTypes    = propTypes
Collapsible.defaultProps = defaultProps

export default Collapsible