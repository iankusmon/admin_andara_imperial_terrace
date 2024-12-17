import { useDropzone } from 'react-dropzone'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  files            : PropTypes.array,
  placeholder      : PropTypes.string,
  onDrop           : PropTypes.func.isRequired,
  onClickRemove    : PropTypes.func.isRequired,
  onClickRemoveAll : PropTypes.func.isRequired
}

/**
 * @param {File} files - image files from user's device disk
 * @param {String} placeholder - text to show in the input
 * @param {Function} onDrop - event handler when a file is dragged and dropped onto the component
 * @param {Function} onClickRemove - function to call when the remove button is clicked
 * @param {Function} onClickRemoveAll - function to call when the remove all button is clicked
 */
const ImageDropzoneMultiple = ({
  files,
  placeholder,
  onDrop,
  onClickRemove,
  onClickRemoveAll
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept   : 'image/jpeg, image/png',
    onDrop,
    multiple : true
  })

  const showFiles = files.length > 0

  return (
    <>
      <div className="dropzone dropzone-multiple" { ...getRootProps() }>
        <div className="fallback">
          <div className="custom-file">
            <input
              className="custom-file-input"
              multiple={ true }
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

      {
        showFiles && (
          <>
            <ListGroup >
              { files.map((file, index) => (
                <ListGroupItem key={ `file-index-${index}` }>
                  <div className='d-flex justify-content-between mt-3'>
                    <div className='d-flex'>
                      <img width='10%' src={ URL.createObjectURL(file) } />
                      <div className='mx-3'>
                        <div className="small mb-1">{ file.name }</div>
                        <span className=" small text-muted mb-0">
                          { Math.round(file.size / 1000) }{ ' kb' }
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button
                        className='align-self-center'
                        color='warning'
                        style={{ right: 0 }}
                        onClick={ () => onClickRemove(file) }
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </div>
                  </div>
                </ListGroupItem>
              ))
              }
            </ListGroup>
            <Button
              className='align-self-center my-2'
              color='warning'
              style={{ right: 0 }}
              onClick={ onClickRemoveAll }
            >
              { 'Remove All' } <i className="fas fa-trash" />
            </Button>
          </>
        )
      }
    </>
  )
}

ImageDropzoneMultiple.propTypes = propTypes
export default ImageDropzoneMultiple