import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  quantity: PropTypes.number
}

/**
 * Displaying quantity including with +/- sign depending on the quantity
 * @param {*} quantity
 */
const QuantityChangeText = ({ quantity }) => {
  let textColor    = 'default'
  let quantityText = '-'

  switch (Math.sign(quantity)) {
    case 1:
      textColor    = 'green'
      quantityText = `+${quantity}`
      break

    case -1:
      textColor    = 'red'
      quantityText = quantity
      break

    default:
      break
  }

  return (
    <div className={ `mr-3 text-${textColor}` }>
      { `${quantityText}` }
    </div>
  )
}

QuantityChangeText.propTypes = propTypes

export default QuantityChangeText
