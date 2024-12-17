import dayjs from 'dayjs'

/** Provide Time utilities  */
const TimeUtil = {
  /**
   * Format datetime to with specific format
   * @param {Date} dateTime - selected date time
   * @param {string} dateFormat - which format that will be applyed. default is `DD MMM YY`
   */
  format: (dateTime, dateFormat='DD MMM YY') => {
    if (!dateTime) return '-'
    return dayjs(dateTime).format(dateFormat)
  },

  /**
   * Get yesterday date
   */
  yesterday: () => dayjs().add(-1, 'day'),

  /**
   * Get last month
   */
  lastMonth: () => dayjs().subtract(1, 'months'),

  /**
   * Get start of the month date
   * @param {Date} dateTime - selected date time
   * @param {string} dateFormat - which format that will be applyed. default is `DD MMM YY`
   */
  startOfTheMonth: (dateTime, dateFormat='DD MMM YY') => {
    if (!dateTime) return '-'
    return dayjs(dateTime).date(1).format(dateFormat).toString()
  },

  /**
   * Get end of the month date
   * @param {Date} dateTime - selected date time
   * @param {string} dateFormat - which format that will be applyed. default is `DD MMM YY`
   */
  endOfTheMonth: (dateTime, dateFormat='DD MMM YY') => {
    if (!dateTime) return '-'
    return dayjs(dateTime).endOf('month').format(dateFormat).toString()
  },

  now: (format = 'DD MMM YY') => dayjs().format(format),

  diff: (date2, date1, unit = 'day') => dayjs(date2).diff(date1, unit, true)
}

export default TimeUtil