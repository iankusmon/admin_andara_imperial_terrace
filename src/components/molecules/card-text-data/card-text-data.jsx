import React from 'react'
import PropTypes from 'prop-types'
import { UncontrolledTooltip } from 'reactstrap'

const propTypes = {
  className : PropTypes.string,
  /** Attribute label */
  label     : PropTypes.string.isRequired,

  /** Attribute value  */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ])
}

const defaultProps = {
  className : '',
  label     : 'label',
  value     : '',
  tooltip   : ''
}
/** Present nice look for objec properties in the Card */
const CardTextData = ({ className, label, value, tooltip }) => {
  const tooltipId = `${label}${value}`

  return (
    <div className={ `mb-3 ${className}` } id={ tooltipId } >
      <span className='small text-uppercase'>{ label }</span>
      {
        tooltip && (
          <span className='ml-2'>
            <i className='fas fa-info-circle text-info' />
          </span>
        )
      }
      <div className='card-text mb-0 font-weight-bold'>
        { value ? value : '-' }
      </div>
      {
        tooltip && (
          <UncontrolledTooltip
            target={ tooltipId }
            innerClassName={ 'text-left' }
          >
            { tooltip }
          </UncontrolledTooltip>
        )
      }

    </div>
  )
}


CardTextData.propTypes    = propTypes
CardTextData.defaultProps = defaultProps

export default CardTextData