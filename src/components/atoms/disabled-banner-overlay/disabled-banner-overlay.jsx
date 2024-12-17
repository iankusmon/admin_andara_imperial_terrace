import React from 'react'
import PropTypes from 'prop-types'
import style from './disabled-banner-overlay.module.scss'

const propTypes = {
  isActive: PropTypes.bool
}

const defaultProps = {
  isActive: true
}

const DisabledBannerOverlay = ({ isActive }) => (
  isActive
    ? <></>
    : (
      <div className={ style.background_blur }>
        { 'DISABLED' }
      </div>
    )
)


DisabledBannerOverlay.propTypes    = propTypes
DisabledBannerOverlay.defaultProps = defaultProps

export default DisabledBannerOverlay
