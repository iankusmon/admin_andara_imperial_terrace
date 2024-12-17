import StringUtil from 'utils/string-util'

const TableUtil = {
  getRowValueByAccessor: (row, accessor) => {
    const accessors = accessor.split('.')
    let cellValue   = row[ accessors[ 0 ] ]

    accessors.forEach((key, index) => {
      if (index !== 0) {
        if (cellValue === null) return null
        cellValue = cellValue[ key ]
      }
    })
    // in case value is not string we need to convert it first before humanize it
    if (cellValue !== null)
      cellValue = cellValue.toString()
    return StringUtil.humanize(cellValue)
  }
}

export default TableUtil