const ParamsUtil = {
  removeEmptyAttributes: (params) => {
    const cleanedParams = {}
    for (const key in params) {
      if (Array.isArray(params[ key ])) {
        if (params[ key ].length > 0) {
          cleanedParams[ key ] = params[ key ]
        }
      }
      else if (params[ key ] !== '' && params[ key ] !== null && params[ key ] !== 'Choose one') {
        cleanedParams[ key ] = params[ key ]
      }
    }
    return cleanedParams
  },
  removeAttributeFromObject: (value,params) => {
    const newObject = {}
    for (const key in params) {
      if (key != value)
        newObject[ key ] = params[ key ]
    }
    return newObject
  }
}

export default ParamsUtil