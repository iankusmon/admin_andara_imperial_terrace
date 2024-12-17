import React from 'react'
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  touched: PropTypes.bool
}

/**
 * TableField only used in FieldArray Component Formik
 * used to show feedback error from formik and api error messages
 * error could be string or array of string
 * @param {array|string} error - from meta.error props formik useField
 * @param {bool} touched - from meta.touched props formik useField
 */
const TableFieldErrorFeedback = ({ error, touched }) => {
  // func to check type ArrayOfString
  const isArrayOfString = (data) => Array.isArray(data) && data.length && data.every((item) => typeof item === 'string')
  // check if error is an array of string or string
  const validErrorType = error && touched && ( isArrayOfString(error) || typeof error == 'string' )

  const feedbackError = validErrorType ? (
    <Alert className="alert-danger">
      <ul>
        {
          error.constructor === Array ?
            error.map((msg, index) => (
              <li key={ index }>
                { msg }
              </li>
            ))
            : error
        }
      </ul>
    </Alert>
  ) : null

  return feedbackError
}

TableFieldErrorFeedback.propTypes = propTypes

export default TableFieldErrorFeedback
