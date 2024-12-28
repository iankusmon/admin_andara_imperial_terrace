import AjbDocumentApiV2 from 'api/v2/admins/ajb-document-v2'
import TitlePage from 'components/atoms/title-page'
import AjbDocumentTable from 'domains/ajb-document/organisms/table/ajb_document_table'
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

const AjbDocumentListPage = ({ pageUtils }) => {
  const [ ajb_documents, setAjbDocuments ]   = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const history                       = useHistory()

  // Method to Fetch customers from server
  const handleFetchAjbDocument = (tableState) => {
    setIsLoading(true)
    AjbDocumentApiV2.get({ tableState: tableState })
      .then((response) => {
        setAjbDocuments(response.data)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSelectRow = useCallback((datum) => {
    const id = datum.id
    history.push({
      pathname: `/app/super_admin/ajb_documents/edit/${id}`
    })
  }, [ history ])

  return (
    <>
      <TitlePage mainTitle={ 'Dokumen AJB' } subTitle={ 'List' } />

      <Card>
        <AjbDocumentTable
          data={ ajb_documents }
          pagination={ pagination }
          onFetchData={ handleFetchAjbDocument }
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

AjbDocumentListPage.propTypes = propTypes
export default AjbDocumentListPage