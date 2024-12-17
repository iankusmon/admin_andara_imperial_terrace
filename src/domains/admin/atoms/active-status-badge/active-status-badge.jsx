import React from 'react'
import PropTypes from 'prop-types'
import StatusBadge from 'components/atoms/status-badge'
import { ACTIVE_STATUS } from 'domains/admin/constants'

const propTypes = {
  activeStatus: PropTypes.string
}

/**
 * To give nice look in access type by given access of the Admin
 * @param {string} activeStatus Admin active_status. available value
 * - `enabled`
 * - `disabled`
 */
const ActiveStatusBadge = ({ activeStatus }) => {

  const colorMap = {
    [ACTIVE_STATUS.ENABLED]  : 'success',
    [ACTIVE_STATUS.DISABLED] : 'danger'
  }

  const color = colorMap[activeStatus] || 'default'

  return <StatusBadge color={ color } label={ activeStatus } />
}

ActiveStatusBadge.propTypes = propTypes

export default ActiveStatusBadge
