import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CustomerOrdersApiV2 from 'api/v2/admins/customer-orders-api-v2'
import { Card, Col, Row } from 'reactstrap'
import CustomerOrderTable from 'domains/customer-order/organisms/table'
import { useHistory, useLocation, useParams } from 'react-router'
import ParamsUtil from 'utils/params-util'
import CustomerOrderFilterForm from 'domains/customer-order/organisms/filter-form'
import { SortAndPerPageFilters } from 'components/organisms'

const SORT_BY_OPTIONS = {
  ORDER_DATE: {
    label : 'Order Date',
    value : 'created_at'
  }
}

const DEFAULT_FILTERS = {
  page                : 1,
  per_page            : 10,
  number              : '',
  status              : '',
  is_cod              : '',
  payment_method_name : '',
  discount_code       : '',
  item_sku            : '',
  customer_name       : '',
  email               : '',
  customer_phone      : ''
}

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const CustomerDetailOrderPage = ({ pageUtils }) => {
  const history = useHistory()

  const { id }                        = useParams()
  const [ orders, setOrders ]         = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(true)
  const location                      = useLocation()

  const filters  = Object.fromEntries(new URLSearchParams(location.search))
  const pathName = Object.fromEntries(new URLSearchParams(location)).pathname

  useEffect(() => {
    handleFetchCustomerOrders()
  }, [ location.search ]) // eslint-disable-line react-hooks/exhaustive-deps

  // Method to Fetch ::Customer::Order from server
  const handleFetchCustomerOrders = () => {
    setIsLoading(true)
    let params          = DEFAULT_FILTERS
    const isEmptyParams = Object.keys(filters).length === 0

    if (!isEmptyParams) {
      params = filters
    }

    CustomerOrdersApiV2.get({ ...params, customer_id: id })
      .then((response) => {
        setOrders(response.data.orders)
        setPagination(response.data.meta)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }

  const handleSubmitFilter = (values, formik) => {
    //remove empty attributes from params
    let params = ParamsUtil.removeEmptyAttributes(values)
    //reset page
    params = ParamsUtil.removeAttributeFromObject('page',params)

    history.push({
      pathname : pathName,
      search   : new URLSearchParams(params).toString()
    })

    formik.setSubmitting(false)
  }

  const handleResetFilter = () => history.push({ pathname: pathName })

  const handlePageChange = (page) => {
    const params = filters
    //replace page value
    params[ 'page' ] = page

    history.push({
      pathname : pathName,
      search   : new URLSearchParams(params).toString()
    })
  }

  /**
   * Handles the change event for sorting.
   * @param {Event} event - The event object triggered by the change.
   */
  const handleSortFilterChange = (event) => {
    let params           = filters
    const urlParamsKey   = event.target.name
    const newFilterValue = event.target.value

    params[urlParamsKey] = newFilterValue
    //reset page
    params = ParamsUtil.removeAttributeFromObject('page',params)

    history.push({
      pathname : pathName,
      search   : new URLSearchParams(params).toString()
    })
  }

  return (
    <>
      <h5 className='text-muted'>FILTERS</h5>
      <Row>
        <Col className='col-xl-2 bg-white pt-3'>
          <CustomerOrderFilterForm
            onClickSubmitForm={ handleSubmitFilter }
            filterValues={ filters }
            onClickReset={ handleResetFilter }
            showCustomerFields={ false }
          />
        </Col>


        <Col className='col-xl-10'>
          <SortAndPerPageFilters
            filterValues={ filters }
            onSortFilterChange={ handleSortFilterChange }
            sortByOptions={ SORT_BY_OPTIONS }
            isLoading={ isLoading }
          />

          <Card className='pt-3'>
            <CustomerOrderTable
              tableProps={{
                size       : 'sm',
                responsive : true
              }}
              orders={ orders }
              pagination={ pagination }
              onPageChange={ handlePageChange }
              isLoading={ isLoading }
              showCustomerFields={ false }
            />
          </Card>
        </Col>
      </Row>

    </>
  )
}

CustomerDetailOrderPage.propTypes = propTypes

export default CustomerDetailOrderPage
