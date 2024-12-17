import InputSelectOptions from 'components/molecules/input-select-options'
import { Field, FieldArray, useField, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Badge,
  Button, FormGroup,
  Label,
  Table
} from 'reactstrap'
import ErrorFeedback from './table-field-error-feedback'


const propTypes = {
  label           : PropTypes.string,
  required        : PropTypes.bool,
  enableAddRow    : PropTypes.bool,
  handleRemoveRow : PropTypes.func,
  renderFields    : PropTypes.arrayOf(PropTypes.shape({
    label       : PropTypes.string,
    type        : PropTypes.any,
    name        : PropTypes.string,
    placeholder : PropTypes.string,
    enterable   : PropTypes.bool
  }).isRequired),
  values : PropTypes.array,
  name   : PropTypes.string.isRequired,
  id     : PropTypes.number
}

const defaultProps = {
  enableAddRow    : true,
  handleRemoveRow : () => {}
}

/**
 *  Table fields hooked up to Formik (only to be used within a Formik component)
 * @param {string} label - label of input field
 * @param {bool} required - Required flag
 * @param {bool} enableAddRow - Enable add new row in the table field
 * @param {func} handleRemoveRow - Handle remove callback. Not mandatory unless you use state to generate table field
 * @param {object} renderFields - Field rendered array. Consist of main block to create Field
 * @example
 * const fields =[
 *   {label: 'First Name', type: 'input', name: 'firstName'},
 *   {label: 'Last Name', type: 'input', name: 'firstName'},
 *   {label: 'Birthday', type: SelectDateField, name: 'firstName'},
 * ]
 *
 * // note:  you can pass `InputField` with `datetime` type
 * @param {string} renderField.label - Field label
 * @param {string | JSX} renderField.type - Field type. can be string or custom component
 * @param {string} renderField.name - Field name. Mandatory props for Field
 * @param {string} renderField.placeholder - Field placeholder, or detail data that probably want to show
 * @param {boolean} renderField.enterable - Field enterable, to enable add row by enter key
 * if there's a render field that has an enterable value of false, make sure you prevent default for the enter
 * key on the form that you're using, otherwise if you're typing on that form and you press enter, the form will SUBMIT
 */
const TableField = ({
  label,
  required,
  enableAddRow,
  renderFields,
  ...props
}) => {
  const [ field, meta ] = useField(props)

  const initalRowValue = () => renderFields.reduce((currentValue, renderField) => currentValue[renderField.name] = '', {})

  const ErrorMessage = ({ name }) => (
    <Field name={ name } >
      { ({ form }) => {
        const error = getIn(form.errors, name)
        // ?: do we need this?
        //const touch = getIn(form.touched, name)
        return error ?
          <small style={{ color: 'red' }}>{ error }</small>
          : null
      } }
    </Field>
  )

  const handleEnterKeyDown = (event, arrayHelpers, enterable) => {
    if (((event.charCode || event.keyCode) === 13) && enterable) arrayHelpers.insert(0, '')
  }

  return (
    <FormGroup>
      {
        label
          ? (
            <Label
              for={ props.id || props.name }
              className='text-gray-light text-capitalize'
            >
              <strong>{ label }</strong>
              {
                required ? <Badge color='warning' className='ml-1'>Required</Badge> : null
              }
            </Label>
          )
          : null
      }
      <ErrorFeedback
        error={ meta.error }
        touched={ meta.touched }
      />
      <FieldArray
        name= { field.name }
        render={ (arrayHelpers) => (
          <>
            <Table bordered>
              <thead className='thead-light'>
                <tr>
                  <th>No.</th>
                  {
                    renderFields.map((renderField) => (
                      <th key={ `table-field-${renderField.name}` }>{ renderField.label }</th>
                    ))
                  }
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  field.value.map((value, index) => (
                    <tr key={ `field-${index}` }>
                      <td>{ index + 1 }</td>
                      {
                        renderFields.map((renderField) => {
                          // * show static data in the table column if the field does not have name
                          if (!renderField.type) return (
                            <td key={ `field-${renderField.name}[index]` }>
                              { field.value[index][renderField.name] }
                            </td>
                          )

                          switch (renderField.type) {
                            case 'input':
                            case 'textarea':
                              return (
                                <td key={ `field-${renderField.name}` }>
                                  <Field
                                    component={ renderField.type }
                                    name={ `${ field.name }.${index}.${renderField.name}` }
                                    placeholder={ renderField.placeholder }
                                    className="form-control"
                                    onKeyDown={ (event) => {
                                      handleEnterKeyDown(event, arrayHelpers, renderField.enterable)
                                    } }
                                  />
                                  <ErrorMessage name={ `${ field.name }.${index}.${renderField.name}` } />
                                </td>
                              )

                            case 'select':
                              return (
                                <td key={ `field-${renderField.name}[index]` }>
                                  <Field
                                    component={ renderField.type }
                                    name={ `${ field.name }.${index}.${renderField.name}` }
                                    placeholder={ renderField.placeholder }
                                    className="form-control"
                                    onKeyDown={ (event) => {
                                      handleEnterKeyDown(event, arrayHelpers, renderField.enterable)
                                    } }
                                  >
                                    <InputSelectOptions options={ renderField.options } keyPrefix={ 'reject-reason' } />
                                  </Field>
                                  <ErrorMessage name={ `${ field.name }.${index}.${renderField.name}` } />
                                </td>
                              )

                            default:
                              // * Only if type is custome compoennt
                              // custom component must only consist of plain input without formGroup, ErrorFeedback, Label or FormText
                              return (
                                <td key={ `field-${renderField.name}` }>
                                  <Field
                                    component={ renderField.type }
                                    name={ `${ field.name }.${index}.${renderField.name}` }
                                    placeholder={ renderField.placeholder }
                                    className="form-control"
                                    // Custom Component need to directly access renderField.enterable otherwise will throw error renderField.enterable no found
                                    onKeyDown={ (event) => {
                                      if (((event.charCode || event.keyCode) === 13) && renderField.enterable) arrayHelpers.insert(0, '')
                                    } }
                                  />
                                  <ErrorMessage name={ `${ field.name }.${index}.${renderField.name}` } />
                                </td>
                              )
                          }
                        })
                      }
                      <td>
                        <Button
                          outline
                          color='danger'
                          onClick={ () => arrayHelpers.remove(index) }
                          block
                        >
                          { 'Remove' }
                        </Button>
                      </td>
                    </tr>
                  ))
                }
                {
                  enableAddRow
                    ? (
                      <tr>
                        <td colSpan={ renderFields.length + 2 }>
                          <Button
                            block
                            color='primary'
                            outline
                            onClick={ () => {arrayHelpers.push(initalRowValue)} }
                          >
                            { 'Add Row' }
                          </Button>
                        </td>
                      </tr>
                    )
                    : null
                }
              </tbody>
            </Table>
          </>
        ) }
      />
    </FormGroup>
  )

}

TableField.propTypes    = propTypes
TableField.defaultProps = defaultProps

export default TableField
