import React from 'react'
import { Button } from 'reactstrap'
import style from './drawer.module.scss'
import PropTypes from 'prop-types'

const propTypes = {
  isOpen       : PropTypes.bool,
  title        : PropTypes.string,
  children     : PropTypes.element,
  onClickClose : PropTypes.func
}

const defaultProps = {
  isOpen   : false,
  title    : '',
  children : <></>
}

/**
 * Drawer component
 * Used for showing the filter and sortby in mobile view
 *
 * @param {Boolean} isOpen - flag to show the drawer
 * @param {ReactElement} children - things to put below the button
 * @param {Function} onClickClose - handles closing the drawer
 */
const Drawer = ({
  isOpen,
  title,
  children,
  onClickClose
}) => (
  <>
    {
      isOpen
        ? <div className='backdrop bg-default' style={{ opacity: '0.5', zIndex: 1050 }} onClick={ onClickClose }/>
        : null
    }
    <div className={ `${style.drawer} ${isOpen ? style.active : ''}` }>
      <div className='p-3 d-flex justify-content-between'>

        { title && <span className='display-4'> { title } </span> }

        <Button
          className='border-0 ml-auto'
          outline
          color='default'
          onClick={ onClickClose }
        >
          <i className='fas fa-times fa-lg'/>
        </Button>
      </div>
      { children }
    </div>
  </>
)

Drawer.propTypes    = propTypes
Drawer.defaultProps = defaultProps

export default Drawer
