import React from 'react'
import PropTypes from 'prop-types'
import StatusBadge from 'components/atoms/status-badge'
import { ACCESS } from 'domains/admin/constants'

const propTypes = {
  access: PropTypes.string
}

/**
 * To give nice look in access type by given access of the Admin
 * @param {string} access Admin access. available value
 * - `super_admin`
 * - `admin`
 * - `hr`
 * - `verificator`
 */
const AccessBadge = ({ access }) => {

  const colorMap = {
    [ ACCESS.SUPER_ADMIN ] : 'warning',
    [ ACCESS.ADMIN ]       : 'primary',
    [ ACCESS.HR ]          : 'info',
    [ ACCESS.VERIFICATOR ] : 'success'
  }

  const color = colorMap[access] || 'default'

  return <StatusBadge color={ color } label={ access } />
}

AccessBadge.propTypes = propTypes

export default AccessBadge
