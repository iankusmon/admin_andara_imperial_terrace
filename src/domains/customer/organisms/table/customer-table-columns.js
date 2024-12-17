import RowButton from 'components/atoms/row-button'
import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  buttonText       : PropTypes.string,
  buttonColour     : PropTypes.string,
  isButtonDisabled : PropTypes.func,
  onButtonClick    : PropTypes.func
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
 * @param {string} buttonText - The text that appears at the button on each row
 * @param {string} buttonColour - Bootstrap button type class name (eg. primary)
 * @param {Function} onButtonClick - function that will run when the button is clicked
 */
const customerTableColumns = ({
  buttonText,
  buttonColour,
  onButtonClick
}) => {

  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={ row.original }
      color={ buttonColour }
      onClick={ onButtonClick }
      text={ buttonText }
    />
  )

  ActionCell.propTypes = actionCellPropTypes

  return (
    [
      {
        Header         : 'ID',
        accessor       : 'id',
        disableFilters : true
      },
      {
        Header   : 'Name',
        accessor : 'name'
      },
      {
        Header   : 'email',
        accessor : 'email'
      },
      {
        Header   : 'Mobile',
        accessor : 'mobile'
      },
      {
        Header : 'Action',
        id     : 'action',
        Cell   : ActionCell
      }
    ]
  )
}

customerTableColumns.propTypes = propTypes

export default customerTableColumns
