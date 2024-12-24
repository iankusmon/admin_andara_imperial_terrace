import React from 'react'
import PropTypes from 'prop-types'
import { STATUS } from 'domains/nup/constants'

const propTypes = {
  status: PropTypes.integer
}

/**
 * To give nice look in status type by given status of the Admin
 * @param {integer} status Admin status. available value
 * - `pending`
 * - `approved`
 * - `rejected`
 */
const StatusBadge = ({ status }) => {

  const colorMap = {
    [ STATUS.PENDING ]      : 'warning',
    [ STATUS.APPROPVED ]    : 'success',
    [ STATUS.REJECTED ]     : 'danger',
  }

  const color = colorMap[status] || 'default'

  return <StatusBadge color={ color } label={ status } />
}

StatusBadge.propTypes = propTypes

export default StatusBadge

