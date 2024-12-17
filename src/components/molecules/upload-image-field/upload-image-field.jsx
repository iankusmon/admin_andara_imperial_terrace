import React, { useState } from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  id              : PropTypes.string,
  oldId           : PropTypes.string,
  label           : PropTypes.string,
  image           : PropTypes.object,
  oldImage        : PropTypes.object,
  initialImageSrc : PropTypes.string,
  required        : PropTypes.bool,
  isMultiple      : PropTypes.bool,
  images          : PropTypes.array,
  imageIndex      : PropTypes.number,
  isUsingOldImage : PropTypes.bool,
  setImages       : PropTypes.func,
  setValue        : PropTypes.func
}

const defaultProps = {
  id              : '',
  oldId           : '',
  label           : '',
  image           : new Blob(),
  oldImage        : new Blob(),
  initialImageSrc : '',
  required        : false,
  isMultiple      : false,
  images          : [],
  imageIndex      : -1,
  isUsingOldImage : false,
  setImages       : () => {},
  setValue        : () => {}
}

const UploadImageField = ({
  id,
  oldId,
  label,
  image,
  oldImage,
  initialImageSrc,
  required,
  isMultiple,
  images,
  imageIndex,
  isUsingOldImage,
  setImages,
  setValue
}) => {
  const [ imagesBucket, setImagesBucket ] = useState(images)

  const onChange = (event, setValue, id, oldId) => {
    const input  = event.target.files[0]
    const reader = new FileReader()
    setValue(input)

    if (isMultiple === true) {
      setImagesBucket(imagesBucket.push(input))

      let imageHashes      = []
      var imageBucketIndex = 0

      for (var imageBucket of imagesBucket) {
        let imageHash = {}

        // set index of image only for the newest image put
        if (imageBucketIndex === (imagesBucket.length - 1)){
          imageHash ['index'] = imageIndex
          imageHash ['image'] =  imageBucket
        }
        else {
          imageHash ['index'] = images[imageBucketIndex]['index']
          imageHash ['image'] =  imageBucket
        }

        imageHashes.push(imageHash)
        imageBucketIndex++
      }

      setImages(imageHashes)
    }

    reader.readAsDataURL(input)

    const oldReader = new FileReader()
    oldReader.readAsDataURL(oldImage)

    reader.onload = () => {
      var dataURL = reader.result
      var output  = document.getElementById(id)
      output.src  = dataURL

      if (isUsingOldImage){
        var oldDataUrl =oldReader.result
        var oldOutput  = document.getElementById(oldId)
        oldOutput.src  = oldDataUrl
      }

    }

  }

  const InitialImage = ({ image, initialImageSrc }) => {

    if (image.type) return null

    return (
      <img
        src={ initialImageSrc }
        className='mb-4'
        width='300'
        alt=''
      />
    )

  }

  return (
    <>
      <Input
        name={ id }
        label={ label }
        required={ required }
        type='file'
        accept='image/*'
        onChange={ (event) => {
          onChange(event, setValue, id, oldId)
        } }
      />

      { /*initial image (example case: update image)*/ }
      <InitialImage
        image={ image }
        initialImageSrc={ initialImageSrc }
      />

      { /*new uploaded image*/ }
      <img
        hidden={ !image.type }
        id={ id }
        className='my-3'
        width='300'
        alt='' //keep this alt to '', so it doesn't break the UI (not show anything when no new img uploaded)
      />
    </>
  )
}

UploadImageField.propTypes    = propTypes
UploadImageField.defaultProps = defaultProps

export default UploadImageField
