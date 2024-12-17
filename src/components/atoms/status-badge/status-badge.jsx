import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'reactstrap'
import StringUtil from 'utils/string-util'


const propTypes = {
  /** color of the badge. available colors */
  color: PropTypes.string,

  /** label of the status */
  label: PropTypes.string
}

const defaultProps = {
  pill      : true,
  className : 'badge-lg text-wrap'
}

/** To give nice look of the certain attribute */
const StatusBadge = ({
  color,
  label,
  ...props
}) => (
  <Badge
    { ...props }
    color={ color }
  >
    { StringUtil.humanizeUpperCase(label) }
  </Badge>
)

StatusBadge.propTypes    = propTypes
StatusBadge.defaultProps = defaultProps

export default StatusBadge
