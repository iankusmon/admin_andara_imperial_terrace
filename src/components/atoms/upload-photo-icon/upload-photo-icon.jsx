import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  fill    : PropTypes.string,
  width   : PropTypes.string,
  height  : PropTypes.string,
  viewBox : PropTypes.string
}

const defaultProps = {
  fill    : '#000000',
  width   : '210',
  height  : '211',
  viewBox : '0 0 210 211'
}

/**
 * Multipurpose photo upload icon
 * @param {string} fill - Icon color
 * @param {string} width - Icon width
 * @param {string} height - Icon height
 * @param {string} viewBox - Icon view box
 */

const UploadPhotoIcon = ({ fill, width, height, viewBox, ...props }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    preserveAspectRatio="xMidYMid meet"
    fill={ fill }
    height={ height }
    width={ width }
    viewBox={ viewBox }
    { ...props }
  >
    <g>
      <path
        className="st57"
        d="M169.4,145.2c-0.8,0.8-2.1,0.8-2.9,0l-6.7-6.7v20.8c0,1-0.8,2.1-2.1,2.1c-1.3,0-2.1-1-2.1-2.1v-20.8l-6.7,6.7c-0.4,0.4-1,0.6-1.5,0.6c-0.6,0-1-0.2-1.5-0.6c-0.8-0.8-0.8-2.1,0-2.9l10.2-10.2c0.2-0.2,0.4-0.4,0.6-0.4c0.4-0.2,1-0.2,1.7,0c0.2,0,0.4,0.2,0.6,0.4l10.2,10.2C170.2,143.1,170.2,144.4,169.4,145.2z"
      />
      <path
        className="st57"
        d="M66.8,83.7c-7.3,0-13.3-5.8-13.3-13.3c0-7.3,5.8-13.1,13.3-13.1c7.3,0,13.1,5.8,13.1,13.1C80,77.9,74.1,83.7,66.8,83.7z M66.8,61.4c-5,0-9.2,4.2-9.2,9s4.2,9.2,9.2,9.2c5,0,9-4.2,9-9.2C75.8,65.4,71.8,61.4,66.8,61.4z"
      />
      <path
        className="st57"
        d="M159.8,117.9V48.3c0-3.3-2.7-6.3-6.3-6.3H36c-3.5,0-6.3,2.9-6.3,6.3v94c0,3.3,2.7,6.3,6.3,6.3h93.2c1,14.8,13.5,26.7,28.6,26.7c15.8,0,28.8-12.9,28.8-28.8C186.2,131.5,174.6,118.9,159.8,117.9z M33.9,48.3c0-1,0.8-2.1,2.1-2.1h117.5c1.3,0,2.1,1,2.1,2.1v61.1l-30.4-26.7c-0.8-0.6-2.1-0.6-2.7,0l-36.7,34.2l-16.9-16.7c-0.6-0.6-1.9-0.8-2.7-0.2l-32.3,23.6V48.3z M36,144.4c-1.3,0-2.1-1-2.1-2.1v-13.8l33.3-24.2l17.1,16.9c0.8,0.8,2.1,0.8,2.9,0l36.7-34.2l31.7,27.7v3.1c-14.2,1-25.4,12.3-26.5,26.5H36z M157.7,171.1c-13.5,0-24.4-11-24.4-24.6c0-13.5,11-24.6,24.4-24.6c13.5,0,24.6,11,24.6,24.6C182.1,160,171.2,171.1,157.7,171.1z"
      />
    </g>
  </svg>
)

UploadPhotoIcon.propTypes    = propTypes
UploadPhotoIcon.defaultProps = defaultProps

export default UploadPhotoIcon
