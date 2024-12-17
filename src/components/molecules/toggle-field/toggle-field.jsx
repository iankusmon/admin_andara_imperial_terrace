import React from 'react'
import { Badge, FormFeedback, FormGroup, FormText, Label } from 'reactstrap'
import { useField } from 'formik'
import PropTypes from 'prop-types'

const propTypes = {
  formGroupClassName : PropTypes.string,
  id                 : PropTypes.string,
  label              : PropTypes.string,
  labelOn            : PropTypes.string,
  labelOff           : PropTypes.string,
  formText           : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  required: PropTypes.bool
}

const ToggleField = ({
  formGroupClassName,
  id,
  label,
  labelOn = 'Yes',
  labelOff = 'No',
  formText,
  required,
  ...props
}) => {

  /**
   * Explicitly pass type  to useField to get field.checked
   * ref: https://formik.org/docs/api/useField#fieldinputpropsvalue
   */
  const [ field, meta ] = useField({ type: 'checkbox',...props })
  const invalid         = meta.touched && !!meta.error

  const formFeedbackStyle = meta.error ? { display: 'block' } : { display: 'none' }
  return (
    <FormGroup className={ formGroupClassName }>
      <Label className='text-gray-light text-capitalize font-weight-bolder text-nowrap'>
        { label }
        {
          required && (
            <Badge
              color='warning'
              className='ml-1'
            >
              <i className={ 'fas fa-asterisk' }/>
            </Badge>
          )
        }
      </Label>
      <div>
        <Label className="custom-toggle">
          <input
            id={ id }
            type="checkbox"
            { ...field }
            { ...props }
          />
          <span
            className="custom-toggle-slider rounded-circle text-success"
            data-label-off={ labelOff }
            data-label-on={ labelOn }
          />
        </Label>
      </div>
      <div>
        {
          formText && <FormText>{ formText }</FormText>
        }
        {
          invalid && <FormFeedback style={ formFeedbackStyle }>{ meta.error }</FormFeedback>
        }
      </div>
    </FormGroup>
  )
}

ToggleField.propTypes = propTypes
export default ToggleField