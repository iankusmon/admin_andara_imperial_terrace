import NupApiV2 from 'api/v2/admins/nups-api-v2'
import TitlePage from 'components/atoms/title-page'
import NupTable from 'domains/nup/organisms/table/nup-table'
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

const NupListPage = ({ pageUtils }) => {
  const [ nups, setNups ]   = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const history                       = useHistory()

  // Method to Fetch customers from server
  const handleFetchCustomer = (tableState) => {
    setIsLoading(true)
    NupApiV2.get({ tableState: tableState })
      .then((response) => {
        setNups(response.data)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSelectRow = useCallback((datum) => {
    const id = datum.id
    history.push({
      pathname: `/app/super_admin/nups/edit/${id}`
    })
  }, [ history ])

  return (
    <>
      <TitlePage mainTitle={ 'NUP' } subTitle={ 'List' } />

      <Card>
        <NupTable
          data={ nups }
          pagination={ pagination }
          onFetchData={ handleFetchCustomer }
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

NupListPage.propTypes = propTypes
export default NupListPage
