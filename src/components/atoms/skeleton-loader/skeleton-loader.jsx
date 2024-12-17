import React from 'react'
import PropTypes from 'prop-types'
import { THEME } from './constant'
import style from './skeleton-loader.module.scss'


const propTypes = {
  /** Loading theme, choose `dark` or `light`. */
  theme: PropTypes.string,

  /** Custom classname component */
  className: PropTypes.string,

  /** Skeleton width */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  /** Skeleton height */
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

const defaultProps = {
  theme: 'dark'
}

/** Act as a placeholder for information that is still loading. */
const SkeletonLoader = ({ theme, ...props }) => {

  const propsStyle = {
    maxWidth : props.width,
    width    : props.width,
    height   : props.height
  }

  const themeMap = {
    [THEME.DARK]  : style.dark,
    [THEME.LIGHT] : style.light
  }

  // Map the theme. Set default as dark
  const selectedTheme = themeMap[theme] || style.dark

  const appliedClassName = [ style.skeleton, selectedTheme, props.className ]

  return (
    <div
      className={ appliedClassName.join(' ') }
      style={{ ...propsStyle }}
    />
  )
}

SkeletonLoader.propTypes    = propTypes
SkeletonLoader.defaultProps = defaultProps

export default SkeletonLoader
