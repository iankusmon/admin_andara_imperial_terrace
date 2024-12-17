// * Provide generator function
// * we use 'function' since arrow function have not supported generator yet

/**
 * Filter number with limit by given array
 *
 * @param {array} array
 * @param {func} condition
 * @param {number} maxSize
 * @yield {array} array with specifc length
 */
export function *limitFilter(array, condition, maxSize) {
  if (!maxSize || maxSize > array.length) {
    maxSize = array.length
  }
  let count = 0
  let i     = 0
  while ( count < maxSize && i < array.length ) {
    if (condition(array[i])) {
      yield array[i]
      count++
    }
    i++
  }
}