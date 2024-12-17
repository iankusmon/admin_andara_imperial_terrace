import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'


const proptypes = {
  /** Button text */
  text: PropTypes.string.isRequired,

  /** Page URL that you want redirect to */
  path: PropTypes.string.isRequired,

  /** State to pass to the another page (optional) */
  state: PropTypes.object,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  active: PropTypes.bool,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  block: PropTypes.bool,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  disabled: PropTypes.bool,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  outline: PropTypes.bool,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  size: PropTypes.string,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  color: PropTypes.string,

  /** Reactstrap Button props. see the other props: https://reactstrap.github.io/components/buttons/ */
  className: PropTypes.string
}

const defaultProps = {
  color: 'primary'
}

/**
 * Use this button to redirect to specific page.
 *
 * NOTE: for ReactTable, it's recommended to use `RowButton` even the button is redirecting to the page
 */
const RedirectButton = ({
  text,
  path,
  state,
  ...props
}) => {
  const history = useHistory()

  return (
    <Button
      { ...props }
      onClick={ () => {
        history.push({
          pathname : path,
          state    : state
        })
      } }
    >
      { text }
    </Button>
  )
}

RedirectButton.propTypes    = proptypes
RedirectButton.defaultProps = defaultProps

export default RedirectButton
