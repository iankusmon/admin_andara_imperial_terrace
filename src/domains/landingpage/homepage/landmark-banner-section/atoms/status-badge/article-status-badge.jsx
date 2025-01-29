import React from 'react'
import PropTypes from 'prop-types'
import DefaultStatusBadge from 'components/atoms/status-badge'
import { STATUS } from 'domains/article/constants/article-constant'

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
    [ STATUS.DISABLED ]    : 'danger',
    [ STATUS.ENABLED ]     : 'success',
  }


  const color = colorMap[status] || 'default'

  return <DefaultStatusBadge color={ color } label={ status } />
}

StatusBadge.propTypes = propTypes

export default StatusBadge

