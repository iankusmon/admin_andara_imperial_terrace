import { useField } from 'formik'
import React from 'react'
import {
  Button,
  FormGroup, Label
} from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  label         : PropTypes.string,
  onClickAdd    : PropTypes.func,
  onClickChange : PropTypes.func,
  props         : PropTypes.object
}

// Attempt to implement a domain independent image field
/**
  * @param {function} onClickAddImage    - handler when clicking Add button in ImageField
  * @param {function} onClickChangeImage - handler when clicking Change button in ImageField
  */
const ImageField = ({
  label,
  onClickAdd = () => {},
  onClickChange = () => { },
  ...props
}) => {

  const [ field, meta, helpers ] = useField(props)
  const valid                    = meta.touched && !meta.error
  // const invalid                  = meta.touched && !!meta.error

  const handleClickRemove = () => {
    helpers.setValue({ id: '', url: '' })
  }

  const handleClickChange = () => {
    // pass field.value to the parent
    onClickChange(field.name)
  }

  const handleClickAdd = () => {
    onClickAdd(field.name)
  }

  return (
    <>
      <FormGroup
        className={ !meta.touched[field.name] ? '' :
          valid ? 'has-success' : 'has-danger' }
      >
        <Label
          for={ field.name }
          className='text-gray-light text-capitalize form-control-label'
        >
          { label }
        </Label>
        {
          field.value?.url && field.value?.id
            ? <>
              <div className='mb-3'>
                <img
                  src={ field.value.url }
                  className='img-fluid'
                  style={{ maxHeight: 100 }}
                />
              </div>
              {
                field.value?.url
                  ? (
                    <Button onClick={ handleClickChange } color='warning' outline>
                      { 'Change' }
                    </Button>
                  )
                  : (
                    <Button onClick={ handleClickRemove } color='warning' outline>
                      { 'Remove' }
                    </Button>
                  )
              }

            </>
            : <div>
              <div
                className='bg-light d-flex flex-column justify-content-center align-items-center'
                style={{ height: '200px', maxWidth: '100%' }}
              >
                <i className='bi bi-image' style={{ fontSize: '2rem' }} />
                <Button onClick={ handleClickAdd } color='primary'>
                  { 'Add Image' }
                </Button>
              </div>

            </div>
        }
      </FormGroup>

    </>
  )
}

ImageField.propTypes = propTypes

export default ImageField
