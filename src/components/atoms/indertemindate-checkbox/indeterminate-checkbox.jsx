import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'


const propTypes = {
  indeterminate : PropTypes.bool,
  className     : PropTypes.string
}

/**
 * Versatile checkbox that can be used outside the form
 * @param {bool} indeterminate - indeterminate value. see https://www.w3schools.com/jsref/prop_checkbox_indeterminate.asp.
 */
const IndeterminateCheckbox = React.forwardRef(
  ({ className, indeterminate, ...rest }, ref) => {
    const defaultRef  = React.useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [ resolvedRef, indeterminate ])

    return (
      <>
        <Input className={ className } type="checkbox" ref={ resolvedRef } { ...rest } />
      </>
    )
  }
)

IndeterminateCheckbox.propTypes   = propTypes
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'

export default IndeterminateCheckbox
