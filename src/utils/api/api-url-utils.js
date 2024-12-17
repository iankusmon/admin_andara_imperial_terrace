const ApiUrlUtils = {
  /**
   * Takes in url with params (api/v2/...?param1=value1) and returns an object of the param.
   * @param {String} url - url of the payment endpoint with or without params
   * @return {Object}
   */
  urlParams: (url) => {
    const urlSplit = url.split('?')
    if (urlSplit.length == 1) return { }
    const urlParams = urlSplit[1]

    // [param1=value1, ...]
    const paramsSplit = urlParams.split(',')
    var paramObject   = {}

    paramsSplit.forEach((param) => {
      // [param1, value1]
      const paramValue           = param.split('=')
      paramObject[paramValue[0]] = paramValue[1]
    })
    return paramObject
  }
}

export default ApiUrlUtils
