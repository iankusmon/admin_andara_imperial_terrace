import PpjbDocumentApiV2 from 'api/v2/admins/ppjb-document-v2'
import TitlePage from 'components/atoms/title-page'
import DownPaymentTable from 'domains/ajb-document/organisms/table/ajb_document_table'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { Card } from 'reactstrap'

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const PpjbDocumentTable = ({ pageUtils }) => {
  const [ ppjb_documents, setPpjbDocuments ]   = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const history                       = useHistory()

  // Method to Fetch customers from server
  const handleFetchPpjbDocument = (tableState) => {
    setIsLoading(true)
    PpjbDocumentApiV2.get({ tableState: tableState })
      .then((response) => {
        setPpjbDocuments(response.data)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSelectRow = useCallback((datum) => {
    const id = datum.id
    history.push({
      pathname: `/app/super_admin/ppjb_documents/edit/${id}`
    })
  }, [ history ])

  return (
    <>
      <TitlePage mainTitle={ 'Dokumen PPJB' } subTitle={ 'List' } />

      <Card>
        <DownPaymentTable
          data={ ppjb_documents }
          pagination={ pagination }
          onFetchData={ handleFetchPpjbDocument }
          isLoading={ isLoading }
          rowButtonProps={{
            buttonText    : 'View',
            buttonColour  : 'primary',
            onButtonClick : handleSelectRow
          }}
        />
      </Card>
    </>
  )
}

PpjbDocumentTable.propTypes = propTypes
export default PpjbDocumentTable