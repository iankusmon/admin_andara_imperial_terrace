import { useField } from 'formik'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Badge, FormGroup, Label } from 'reactstrap'

const propTypes = {
  label              : PropTypes.string,
  name               : PropTypes.string.isRequired,
  formGroupClassName : PropTypes.string,
  formText           : PropTypes.string,
  required           : PropTypes.bool,
  id                 : PropTypes.string,
  dropzoneProps      : PropTypes.object
}

/** Uplaod Form Styling Begins */
const baseStyle = {
  flex            : 1,
  display         : 'flex',
  flexDirection   : 'column',
  alignItems      : 'center',
  margin          : '40px',
  padding         : '20px',
  borderWidth     : 2,
  borderRadius    : 2,
  borderColor     : '#eeeeee',
  borderStyle     : 'dashed',
  backgroundColor : '#fafafa',
  color           : '#bdbdbd',
  outline         : 'none',
  transition      : 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

/**
 * Form to choose category of importing Merchant Inbound Items
 * @param {string} label - Field Label
 * @param {string} formGroupClassName - Custom FormGroup classname
 * @param {bool} required - Required badge flag
 * @param {object} dropzoneProps - Dropzone Props. See https://react-dropzone.js.org/#src
 */
const UploadFileField = ({
  label,
  formGroupClassName,
  required,
  dropzoneProps,
  ...props
}) => {

  const [ field, meta, helper ] = useField(props)
  const invalid                 = meta.touched && !!meta.error

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      helper.setValue(acceptedFiles)
    },
    ...dropzoneProps
  })


  const style =  useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ])

  /** Display dropped files */
  const DroppedFiles = ({ files }) => (
    files && files.map((file, i) => (
      <p key={ i }>
        { `File:${file.name} Size:${file.size} bytes` }
      </p>
    )
    ))

  /** Display rejected file after uploading the files */
  const RejectedFiles = ({ files }) => (
    files.map(({ file, errors }) => (
      <li style={{ color: 'red' }} key={ file.path }>
        { file.path } - { file.size } bytes
        <ul>
          { errors.map((e) => (
            <li key={ e.code }>{ e.message }</li>
          )) }
        </ul>
      </li>
    ))
  )

  return (
    <FormGroup className={ formGroupClassName }>
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
      <div className="container mb-lg-5">
        <div { ...getRootProps({ style }) }>
          <input
            { ...getInputProps() }
            { ...props }
          />
          {
            field.value.length > 0
              ? <DroppedFiles files={ field.value } />
              : <p>Drag and drop a file here, or click to select files</p>
          }

        </div>

        <RejectedFiles files={ fileRejections } />
      </div>
      {
        invalid && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{ meta.error }</div>
        ) }
    </FormGroup>
  )
}

UploadFileField.propTypes = propTypes

export default UploadFileField
