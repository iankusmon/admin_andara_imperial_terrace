import DownPaymentApiV2 from 'api/v2/admins/down-payment-api-v2'
import TitlePage from 'components/atoms/title-page'
import DownPaymentTable from 'domains/down-payment/organisms/table/down_payment_table'
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

const DownPaymentListPage = ({ pageUtils }) => {
  const [ down_payments, setDownPayments ]   = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const history                       = useHistory()

  // Method to Fetch customers from server
  const handleFetchDownPayment = (tableState) => {
    setIsLoading(true)
    DownPaymentApiV2.get({ tableState: tableState })
      .then((response) => {
        setDownPayments(response.data)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSelectRow = useCallback((datum) => {
    const id = datum.id
    history.push({
      pathname: `/app/super_admin/down_payments/edit/${id}`
    })
  }, [ history ])

  return (
    <>
      <TitlePage mainTitle={ 'Down Payment' } subTitle={ 'List' } />

      <Card>
        <DownPaymentTable
          data={ down_payments }
          pagination={ pagination }
          onFetchData={ handleFetchDownPayment }
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

DownPaymentListPage.propTypes = propTypes
export default DownPaymentListPage
