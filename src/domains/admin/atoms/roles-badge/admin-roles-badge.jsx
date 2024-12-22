import React from 'react'
import PropTypes from 'prop-types'
import StatusBadge from 'components/atoms/status-badge'
import { ROLES } from 'domains/admin/constants'

const propTypes = {
  roles: PropTypes.string
}

/**
 * To give nice look in roles type by given roles of the Admin
 * @param {string} roles Admin roles. available value
 * - `super_admin`
 * - `admin`
 * - `hr`
 * - `verificator`
 */
const RolesBadge = ({ roles }) => {

  const colorMap = {
    [ ROLES.SUPER_ADMIN ] : 'warning',
    [ ROLES.ADMIN ]       : 'primary',
    [ ROLES.HR ]          : 'info',
    [ ROLES.VERIFICATOR ] : 'success'
  }

  const color = colorMap[roles] || 'default'

  return <StatusBadge color={ color } label={ roles } />
}

RolesBadge.propTypes = propTypes

export default RolesBadge
