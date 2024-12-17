//Provide utility to handle error messages
const ErrorApiV2Util = {
  /**
   * find messages with key == 'base'
   * @returns {array} array of string
   */
  getGenericMessage: ( error ) => {
    const messages = error.response.data.messages

    if ('base' in messages) {
      return messages['base']
    }

    return messages || []
  },

  /**
   * find messages from each key and concat them into one array of error messages
   * @returns {array} array of string
   */
  parseMessage: (errorMsgs) => {
    let errorArray = []

    Object.keys(errorMsgs).forEach((attr) => {
      const joinedMsg = errorMsgs[attr]
      errorArray      = [ ...errorArray, ...joinedMsg ]
    })
    return errorArray
  }

}

export default ErrorApiV2Util
