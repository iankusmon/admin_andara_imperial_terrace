import BookingFeeApiV2 from 'api/v2/admins/booking-fees-api-v2'
import TitlePage from 'components/atoms/title-page'
import BookingFeeTable from 'domains/booking-fee/organisms/table/booking_fee_table'
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

const BookingFeeListPage = ({ pageUtils }) => {
  const [ booking_fees, setBookingFees ]   = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const history                       = useHistory()

  // Method to Fetch customers from server
  const handleFetchBookingFee = (tableState) => {
    setIsLoading(true)
    BookingFeeApiV2.get({ tableState: tableState })
      .then((response) => {
        setBookingFees(response.data)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSelectRow = useCallback((datum) => {
    console.log(datum)
    const id = datum.id
    history.push({
      pathname: `/app/super_admin/booking_fees/edit/${id}`
    })
  }, [ history ])

  return (
    <>
      <TitlePage mainTitle={ 'Booking Fee' } subTitle={ 'List' } />

      <Card>
        <BookingFeeTable
          data={ booking_fees }
          pagination={ pagination }
          onFetchData={ handleFetchBookingFee }
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

BookingFeeListPage.propTypes = propTypes
export default BookingFeeListPage
