import CustomersApiV2 from 'api/v2/admins/customers-api-v2'
import TitlePage from 'components/atoms/title-page'
import CustomerTable from 'domains/customer/organisms/table'
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

const CustomerListPage = ({ pageUtils }) => {
  const [ customers, setCustomers ]   = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const history                       = useHistory()

  // Method to Fetch customers from server
  const handleFetchCustomer = (tableState) => {
    setIsLoading(true)
    CustomersApiV2.get({ tableState: tableState })
      .then((response) => {
        setCustomers(response.data)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSelectRow = useCallback((datum) => {
    const id = datum.id
    history.push({
      pathname: `/app/super_admin/customer/edit/${id}`
    })
  }, [ history ])

  return (
    <>
      <TitlePage mainTitle={ 'Customer' } subTitle={ 'List' } />

      <Card>
        <CustomerTable
          data={ customers }
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

CustomerListPage.propTypes = propTypes
export default CustomerListPage
