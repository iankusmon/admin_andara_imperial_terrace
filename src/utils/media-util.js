const MediaUtil = {

  /**
   * Download image by source URL
   * @param {string} url - image source URL
   * @param {string} filename - filename for the image
   */
  download: async (url, filename) => {
    // Create an object URL for the blob object
    const objectUrl = await fetch(url)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))

    // Create a new anchor element
    const a = document.createElement('a')

    // Set the href and download attributes for the anchor element
    // You can optionally set other attributes like `title`, etc
    // Especially, if the anchor element will be attached to the DOM
    a.href     = objectUrl
    a.target   = '_blank'
    a.download = filename || 'download.png'

    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    const clickHandler = () => {
      setTimeout(() => {
      // URL.revokeObjectURL(url)
        removeEventListener('click', clickHandler)
      }, 150)
    }

    // Add the click event listener on the anchor element
    // Comment out this line if you don't want a one-off download of the blob content
    a.addEventListener('click', clickHandler, false)

    // Programmatically trigger a click on the anchor element
    // Useful if you want the download to happen automatically
    // Without attaching the anchor element to the DOM
    // Comment out this line if you don't want an automatic download of the blob content
    a.click()

    // Return the anchor element
    // Useful if you want a reference to the element
    // in order to attach it to the DOM or use it in some other way
    return a
  }
}

export default MediaUtil
