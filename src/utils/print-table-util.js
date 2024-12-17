import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const printTable = ({ title, header, data, options = { } }) => {

  const defaultOptions = {
    orientation : 'landscape',
    unit        : 'mm',
    format      : [ 200, 350 ]
  }

  const combinedOptions = { ...defaultOptions, ...options }

  var pdf = new jsPDF(combinedOptions)

  pdf.setFont('georgia')

  title && pdf.text(15, 10, title)

  pdf.autoTable({
    head : header,
    body : data
  })

  pdf.autoPrint()

  // open new window
  pdf.output('dataurlnewwindow')

}