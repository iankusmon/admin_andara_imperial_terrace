import TitlePage from 'components/atoms/title-page'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useEffect } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Alert, Button } from 'reactstrap'
import StringUtils from 'utils/string-util'
import ProfilePage from './customer-detail-profile-page'
import OrderPage from './customer-detail-order-page'
import { useHistory, useLocation, useParams } from 'react-router'
import CustomersApiV2 from 'api/v2/admins/customers-api-v2'
import CustomerDetailCard from 'domains/customer/organisms/detail-card'
import UserDetailCard from 'domains/user/organisms/user-detail-card'
import { Link } from 'react-router-dom'
import UserDetailAddressPage from 'domains/user/pages/detail-page/user-detail-address-page'

const TAB = {
  PROFILE   : 'profile',
  ADDRESSES : 'addresses',
  ORDER     : 'orders'
}

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const CustomerDetailPage = ({ pageUtils }) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ activeTab, setActiveTab ] = useState('profile')
  const [ customer, setCustomer ]   = useState(undefined)
  const [ user, setUser ]           = useState(undefined)
  const { id }                      = useParams()
  const location                    = useLocation()
  const history                     = useHistory()

  const showAccountLinkAlert = !isLoading && !user && customer

  useEffect(() => {
    const tab = location.hash.replace('#', '')
    if (tab) {
      setActiveTab(tab)
    } else {
      setActiveTab(TAB.PROFILE)
    }
  }, [ location.hash ])

  // func to fetch single customer
  const handleFetchCustomer = useCallback(() => {
    setIsLoading(true)
    CustomersApiV2.show(id)
      .then((response) => {
        setCustomer(response.data.customer)
        setUser(response.data.customer.user)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }, [ id ]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickEditUser = (userId) => {
    history.push({ pathname: `/app/users/${userId}` })
  }

  useEffect(() => {
    handleFetchCustomer()
  }, [ handleFetchCustomer ])

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <>
      <TitlePage mainTitle={ 'Customer' } subTitle={ 'Detail' } />

      <Nav pills className={ 'mb-3' }>
        <NavItem>
          <NavLink
            className={ activeTab === TAB.PROFILE ? 'active' : null }
            onClick={ () => { toggle(TAB.PROFILE) } }
            role='tab'
          >
            { StringUtils.titleCase(TAB.PROFILE) }
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === TAB.ADDRESSES ? 'active' : null }
            onClick={ () => { toggle(TAB.ADDRESSES) } }
            role='tab'
          >
            { StringUtils.titleCase(TAB.ADDRESSES) }
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === TAB.ORDER ? 'active' : null }
            onClick={ () => { toggle(TAB.ORDER) } }
            role='tab'
          >
            { StringUtils.titleCase(TAB.ORDER) }
          </NavLink>
        </NavItem>
      </Nav>

      {
        showAccountLinkAlert  && (
          <Alert color='info'>
            <i className='fas fa-info-circle mr-2' />
            { 'Customer ' }
            <b>{ customer.email }</b>
            { ' belum melakukan proses Account Link. Silahkan lakukan proses Account Link pada akun customer ini agar customer dapat menggunakan fitur User Address.' }
            <br />
            <Button
              className='mt-3'
              color='success'
              tag={ Link }
              to={ `/app/customer-service/account-link?customerEmail=${encodeURIComponent(customer.email)}` }
            >
              { 'Account Link' }
            </Button>
          </Alert>
        )
      }

      <Row>
        <Col md={ 9 }>

          <TabContent activeTab={ activeTab }>
            <TabPane tabId={ TAB.PROFILE }>
              <ProfilePage
                customer={ customer }
                handleFetchCustomer={ handleFetchCustomer }
                pageUtils={ pageUtils }
              />
            </TabPane>

            <TabPane tabId={ TAB.ADDRESSES }>
              <UserDetailAddressPage user={ user } />
            </TabPane>

            <TabPane tabId={ TAB.ORDER }>
              <OrderPage pageUtils={ pageUtils } />
            </TabPane>
          </TabContent>
        </Col>

        <Col md={ 3 }>
          <CustomerDetailCard
            isLoading={ isLoading }
            customer={ customer }
          />
          <UserDetailCard
            user={ user }
            isLoading={ isLoading }
            handleClickEditUser={ handleClickEditUser }
          />
        </Col>
      </Row>
    </>
  )
}

CustomerDetailPage.propTypes = propTypes
export default CustomerDetailPage
