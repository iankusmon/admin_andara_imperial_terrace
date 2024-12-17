import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup } from 'reactstrap'
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { useCallback } from 'react'


const propTypes = {
  onSelectImages       : PropTypes.func,
  onSelectCover        : PropTypes.func,
  onFileSelectionError : PropTypes.func.isRequired,
  expectedAspectRatio  : PropTypes.string,
  multiple             : PropTypes.bool,
  allowChooseCover     : PropTypes.bool,
  allowAllAspectRatio  : PropTypes.bool
}

const defaultProps = {
  setChosenImage      : () => {},
  onSelectCover       : () => {},
  expectedAspectRatio : '1:1',
  multiple            : true,
  allowChooseCover    : true,
  allowAllAspectRatio : false
}

/**
 * Input Field used to choose image (with browse file button)
 * It will then preview the chosen image
 *
 * @param {string} setChosenImage - a function that will run when an image is chosen
 * @param {string} setChosenImage - a function that will run when a cover is chosen
 * @param {string} onFileSelectionError - a function that will run when the chosen file is not an image OR has a wrong dimension
 * @param {string} expectedAspectRatio - string expected aspect ratio, format x:x, e.g: 1:1, 2:3, 16:9
 * @param {boolean} multiple - a boolean to determine whether a user can upload multiple files or not
 */
const InputImageField = forwardRef(({
  onSelectImages,
  onSelectCover,
  onFileSelectionError,
  expectedAspectRatio,
  multiple,
  allowChooseCover,
  allowAllAspectRatio
}, ref) => {

  const [ images, setImages ]                     = useState([])
  const [ loadedImageCount, setLoadedImageCount ] = useState(0)
  const [ cover, setCover ]                       = useState(null)

  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    resetFile() {
      inputRef.current.value = ''
      cleanUp()
    }
  }))


  const cleanUp = useCallback(
    () => {
      inputRef.current.value = ''
      setLoadedImageCount(0)
      setImages([])
      onSelectImages([])
    },
    [ onSelectImages ]
  )

  const isImageFile = (file) => ( file?.type?.split('/')[0] === 'image' )

  const handleImageError = useCallback(
    (message) => {
      onFileSelectionError(
        { message: message }
      )
      cleanUp()
    },
    [ cleanUp, onFileSelectionError ]
  )

  const handleFileChange = (event) => {
    const files          = event.target.files
    const selectedImages = []
    let error            = false

    setCover(null)

    Array.from(files).forEach( (file, idx) => {
      if (!isImageFile(file)) {
        handleImageError(`${file.name} bukan file gambar!`)
        error = true
        return
      }
      selectedImages.push({
        file : file,
        url  : URL.createObjectURL(file),
        id   : idx
      })
    })

    if (error) {
      cleanUp()
      return
    }

    setImages(selectedImages)
  }

  const handleOnImageClick = useCallback( ({ target: image }) => {
    const newCover = parseInt(image.id) !== cover ? parseInt(image.id) : null
    setCover(newCover)
  },[ cover ])

  const handleImageLoad = useCallback(
    (imageDOM, imageFile) => {
      const { target: { naturalWidth, naturalHeight } } = imageDOM
      const currentRatio                                = parseFloat(naturalWidth) / parseInt(naturalHeight)
      const expectedWidthRatio                          = parseFloat(expectedAspectRatio.split(':')[0])
      const expectedHeightRatio                         = parseInt(expectedAspectRatio.split(':')[1])

      if (allowAllAspectRatio === false) {
        if (currentRatio != (expectedWidthRatio/expectedHeightRatio)) {
          handleImageError(`${imageFile.name} memiliki resolusi: ${naturalWidth}px x ${naturalHeight}px.\n\nPilih Image dengan aspect ratio:\n${expectedAspectRatio}`)
          return
        }
      }
      setLoadedImageCount( (prevCount) => prevCount + 1 )
    },
    [ allowAllAspectRatio, expectedAspectRatio, handleImageError ]
  )

  useEffect( () => {
    if (loadedImageCount === 0 || images.length === 0) return
    if (loadedImageCount < images.length) return

    onSelectImages( images.map( (image) => image.file) )
  },
  [
    loadedImageCount,
    images,
    onSelectImages
  ])

  useEffect( () => {
    onSelectCover({
      index : cover,
      url   : images[cover]?.url
    })
  },[ cover, onSelectCover, images ])

  return (
    <div>
      <FormGroup>
        <input
          ref={ inputRef }
          type='file'
          accept='image/*'
          multiple={ multiple }
          onChange={ handleFileChange }
          className='text-truncate'
        />
      </FormGroup>
      <div className="mt-2 d-flex">
        {
          images.map( (image, idx) => (
            <img
              src={ image.url }
              style={{
                flex      : '1 1 0',
                minWidth  : 0,
                minHeight : 0,
                width     : '100%',
                maxWidth  : '300px',
                border    : `2px solid ${image.id === cover ? 'blue' : 'transparent'}`
              }}
              className={ `${idx === 0 ? 'ml-0' : 'ml-2'} ${idx === images.length - 1 ? 'mr-0' : 'mr-2'}` }
              alt="upload preview"
              id={ image.id }
              key={ image.id }
              onClick={ handleOnImageClick }
              // width={ images.length > 1 ? (600 / images.length) : '300' }
              onLoad={ (imageDOM) => handleImageLoad(imageDOM, image.file) }
            />
          ))
        }
      </div>
      {
        allowChooseCover && (
          <div>
            { images.length > 0 ? '(Klik pada gambar untuk memilih cover)' : null }
          </div>
        )
      }
    </div>
  )
})

InputImageField.propTypes    = propTypes
InputImageField.defaultProps = defaultProps

// because using forwardRef
InputImageField.displayName = 'InputImageField'


export default InputImageField