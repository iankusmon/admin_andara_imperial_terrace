const CURRENCY_SEPARATOR = Object.freeze(',')

/**
 * Proivde utilities for parsing String value
 */
const StringUtil = {

  /**
   * Convert text into human readable text.
   * It will remove space, underscore, and capitalize first letter of the text
   *
   * i.e `this_is_text` => `This is text`
   * @param {string} text selected text that will be converted
   */
  humanize: (text) => {
    if (text === undefined || text === '' || text === null) return ''
    return text
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/^[a-z]/, (m) => m.toUpperCase())
  },

  /**
   * Capitalize first letter on each word
   *
   * i.e `this is text` => `This Is Text`
   * @param {string} text
   */
  capitalizeAll: (text) => {
    const capitalizedText = text.split(' ').map((word) => {
      const firstLetter  = word.slice(0, 1).toUpperCase()
      const otherLetters = word.substr(1, word.length).toLowerCase()

      return `${firstLetter}${otherLetters}`
    }).join(' ')

    return capitalizedText
  },

  /**
   * Uppercase humanized text. It will do two things:
   * - Humanized text
   * - Uppercase all letters
   *
   * i.e `this_is_text` => `THIS IS TEXT`
   * @param {string} text selected text
   */
  humanizeUpperCase: (text) => StringUtil.humanize(text).toUpperCase(),

  /**
   * Convert text to humanized title case. It will do two things:
   * - Humanized text
   * - All first letter of the word always capitalize
   *
   * i.e `this_is_text` => `This Is Text`
   * @param {string} text
   */
  titleCase: (text) => StringUtil.capitalizeAll(StringUtil.humanize(text)),

  /**
   * Convert number into currency format. example: 5000000 -> 5,000,000
   * @param {string} value - Numeric string
   * @param {bool} with_symbol - Flag to use currency symbol. default is `true`
   * @param {string} symbol - Currency Symbol. Default is `Rp`
   */
  currencyCase: (value, with_symbol = true, symbol = 'Rp') => {

    if (!value) value = ''

    const parsedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, CURRENCY_SEPARATOR)

    return with_symbol
      ? [ symbol, parsedValue ].join(' ')
      : parsedValue
  },

  /**
   * parse the currency case into numeric string. example 5,000,000 -> '5000000'
   * @param {string} value - currency value
   */
  parseCurrency: (value) => {
    // ? might want to parse the currency with symbol later

    const regex = new RegExp(CURRENCY_SEPARATOR, 'g')
    return value.replace(regex,'')
  },

  /**
   * transform name string into url which is separated with '-' and being lowercased. example 'Best of Zara' -> 'best-of-zara'
   * @param {string} value - name string
   */
  transformToUrl: (value) => {
    var url = value.replace(/\W+(?!$ )/g, '-').toLowerCase()
    url     = url.replace(/\W$/, '').toLowerCase()
    return url
  },

  /**
   * transform decimal string into percentage with 1 number after decimal
   * @param {string} value - decimal string
   */
  transformToPercentage: (value) => {
    var percentage = parseFloat(value) * 100
    percentage     = percentage.toFixed(1)
    return percentage
  }
}

export default StringUtil