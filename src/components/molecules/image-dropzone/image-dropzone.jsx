import { useDropzone } from 'react-dropzone'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  imageUrl      : PropTypes.string,
  file          : PropTypes.object,
  placeholder   : PropTypes.string,
  onDrop        : PropTypes.func.isRequired,
  onClickRemove : PropTypes.func.isRequired
}

/**
 * @param {String} imageUrl - url of existing image that would be replaced
 * @param {File} file - image file from user's device disk
 * @param {String} placeholder - text to show in the input
 * @param {Function} onDrop - event handler when a file is dragged and dropped onto the component
 * @param {Function} onClickRemove - function to call when the remove button is clicked
 */
const ImageDropzone = ({
  imageUrl,
  file,
  placeholder,
  onDrop,
  onClickRemove
}) => {

  const { getRootProps, getInputProps } = useDropzone({
    accept   : 'image/jpeg, image/png',
    onDrop,
    multiple : false
  })

  const showImageUrl = imageUrl && !file
  const showFile     = file
  const showInput    = !file
  const previewSrc   = file ? URL.createObjectURL(file) : imageUrl

  return (
    <>
      {
        showFile && (
          <div className='position-relative'>
            <img width='100%' src={ previewSrc } />
            <div className='d-flex justify-content-between mt-3'>
              <div>
                <div className="small mb-1">{ file.name }</div>
                <span className=" small text-muted mb-0">
                  { Math.round(file.size / 1000) }{ ' kb' }
                </span>
              </div>
              <div className='flex-grow-2'>
                <Button
                  className='align-self-center'
                  color='warning'
                  style={{ right: 0 }}
                  onClick={ onClickRemove }
                >
                  <i className="fas fa-trash" />
                </Button>
              </div>
            </div>

          </div>
        )
      }
      {
        showInput && (
          <div className="dropzone dropzone-multiple" { ...getRootProps() }>
            {
              showImageUrl && (
                <div className='w-100'>
                  <img width='100%' src={ imageUrl } />
                </div>
              )
            }
            <div className="fallback">
              <div className="custom-file">
                <input
                  className="custom-file-input"
                  multiple={ false }
                  type="image"
                  { ...getInputProps() }
                />
                <label
                  className="custom-file-label"
                  htmlFor="customFileUploadMultiple"
                >
                  { placeholder }
                </label>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

ImageDropzone.propTypes = propTypes
export default ImageDropzone