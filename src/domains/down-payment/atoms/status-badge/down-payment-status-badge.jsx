import React from 'react'
import PropTypes from 'prop-types'
import DefaultStatusBadge from 'components/atoms/status-badge'
import { STATUS } from 'domains/down-payment/constants/down-payment-constant'

const propTypes = {
  status: PropTypes.string
}

/**
 * To give nice look in status type by given status of the Admin
 * @param {string} status Admin status. available value
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

  return <DefaultStatusBadge color={ color } label={ status } />
}

StatusBadge.propTypes = propTypes

export default StatusBadge

