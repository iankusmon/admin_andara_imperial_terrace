/* eslint react/prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  ACCESS,
  CREATED_AT,
  ACTIVE_STATUS
} from 'domains/admin/constants'
import { RowButton, SelectTableFilter } from 'components/atoms'
import AccessBadge from 'domains/admin/atoms/access-badge'
import TimeUtil from 'utils/time-util'
import ActiveStatusBadge from 'domains/admin/atoms/active-status-badge'

const propTypes = {
  handleDisableAdmin : PropTypes.func,
  handleEnableAdmin  : PropTypes.func
}

const actionCellPropTypes = {
  cell: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.object
    })
  })
}

/**
 * Columns definition for Customer Table
 * @param {Function} handleDisableAdmin - function that will disable Admin's active_status
 * @param {Function} handleEnableAdmin - function that will enable Admin's active_status
 */
const adminTableColumns = ({
  handleDisableAdmin,
  handleEnableAdmin
}) => {

  const ActionCell = ({ cell: { row } }) => {
    const activeStatus         = row.original.active_status
    const isActiveStatusEnable = activeStatus == ACTIVE_STATUS.ENABLED
    return (
      <RowButton
        data={ row.original }
        color={ isActiveStatusEnable ? 'danger': 'primary' }
        onClick={ isActiveStatusEnable ? handleDisableAdmin : handleEnableAdmin }
        text={ isActiveStatusEnable ? 'disable' : 'enable' }
      />
    )
  }

  ActionCell.propTypes = actionCellPropTypes

  const AdminAccessFilter = ({ column }) => {
    const options = Object.keys(ACCESS).map((key) => (
      {
        label : ACCESS[key],
        value : ACCESS[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const CreatedAtFilter = ({ column }) => {
    const options = Object.keys(CREATED_AT).map((key) => (
      {
        label : CREATED_AT[key].label,
        value : CREATED_AT[key].value
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } enableAll={ false } />
    )
  }

  const ActiveStatusFilter = ({ column }) => {
    const options = Object.keys(ACTIVE_STATUS).map((key) => (
      {
        label : ACTIVE_STATUS[key],
        value : ACTIVE_STATUS[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options }/>
    )
  }

  const AdminAccessCell = (row) => <AccessBadge access={ row.cell.value } />

  const ActiveStatusCell = (row) => <ActiveStatusBadge activeStatus={ row.cell.value } />

  const DateCell = (row) => TimeUtil.format(row.cell.value)

  return (
    [
      {
        Header         : 'Id',
        accessor       : 'id',
        disableFilters : true
      },
      {
        Header   : 'Name',
        accessor : 'name'
      },
      {
        Header   : 'Username',
        accessor : 'username'
      },
      {
        Header   : 'Email',
        accessor : 'email'
      },
      {
        Header   : 'Mobile',
        accessor : 'mobile'
      },
      {
        Header   : 'Roles',
        accessor : 'access',
        Filter   : AdminAccessFilter,
        Cell     : AdminAccessCell
      },
      {
        Header   : 'Created At',
        accessor : 'created_at',
        Filter   : CreatedAtFilter,
        Cell     : DateCell
      },
      {
        Header   : 'Status',
        accessor : 'active_status',
        Filter   : ActiveStatusFilter,
        Cell     : ActiveStatusCell
      },
      {
        Header : 'Action',
        id     : 'action',
        Cell   : ActionCell
      }
    ]
  )
}

adminTableColumns.propTypes = propTypes

export default adminTableColumns
