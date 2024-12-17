import { useField } from 'formik'
import { Label,Input,FormGroup } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  name  : PropTypes.string.isRequired,
  label : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  formGroupClassName : PropTypes.string,
  required           : PropTypes.bool,
  color              : PropTypes.string
}

/**
 * Checkbox field hooked up to Formik (only to be used within a Formik component)
 *
 * @param {string} name - Field name
 * @param {string} label - name of label
 * @param {booelan} required - Display a red asterix beside label
 * @param {object} props - handles name, checked props.
 */
const CheckboxField = ({
  formGroupClassName,
  label,
  required,
  color= 'primary',
  ...props
}) => {

  /**
   * Explicitly pass type to useField to:
   *  - get field.checked
   *  - remove need to define `type` prop when using this comp
   * ref: https://formik.org/docs/api/useField#fieldinputpropsvalue
   *
   * valid/invalid props removed due to styling validity styles
   */
  const [ field, meta ] = useField({ type: 'checkbox', ...props })
  const invalid         = meta.touched && !!meta.error

  return (
    <FormGroup className={ formGroupClassName }>
      <div className={ `custom-control custom-checkbox ${color && `custom-checkbox-${color}`}` }>
        <Input
          className='custom-control-input'
          id={ field.name }
          type={ 'checkbox' }
          { ...field }
          { ...props }
        />
        <Label
          className='custom-control-label'
          htmlFor={ field.name }
        >
          { label }
        </Label>
      </div>
      { required && <span className='font-weight-bold text-danger'>{ ' ' }*</span> }
      { invalid ? <small className='text-danger'>{ meta.error }</small> : null }
    </FormGroup>
  )
}

CheckboxField.propTypes = propTypes

export default CheckboxField
