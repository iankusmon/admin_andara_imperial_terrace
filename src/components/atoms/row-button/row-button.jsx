import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'


const propTypes = {
  /** data from specific row. You can get from `row.original` when using custom cell in ReactTable */
  data: PropTypes.object.isRequired,

  /** onClick handler to execute certain code by pass `data` from row instance */
  onClick: PropTypes.func,

  /** a flag to disable the button */
  disabled: PropTypes.bool,

  /** Button text */
  text: PropTypes.string,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  active: PropTypes.bool,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  outline: PropTypes.bool,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  color: PropTypes.string,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  size: PropTypes.string,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  className: PropTypes.string
}

const defaultProps = {
  data     : {},
  onClick  : () => {},
  disabled : false,
  color    : 'primary',
  size     : 'sm'
}

/** Button action hooked up to the row in the ReactTable. It used to execute certain action by id at single rows */
const RowButton = ({
  data,
  onClick,
  text,
  disabled,
  ...props
}) => (
  <Button
    { ...props }
    disabled= { disabled }
    onClick={ () => {
      onClick(data)
    } }
  >
    { text }
  </Button>
)

RowButton.propTypes    = propTypes
RowButton.defaultProps = defaultProps

export default RowButton