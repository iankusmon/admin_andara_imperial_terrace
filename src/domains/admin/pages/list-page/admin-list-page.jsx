import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AdminsApiV2 from 'api/v2/admins-api-v2'
import AdminTable from 'domains/admin/organisms/table'
import { TitlePage } from 'components/atoms'
import { Card } from 'reactstrap'
import { useHistory, useLocation } from 'react-router'
import { ALERT_TYPES } from 'constants/alert-constants'

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const AdminListPage = ({ pageUtils }) => {
  const history      = useHistory()
  const location     = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [ admins, setAdmins ]         = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ isLoading, setIsLoading ]   = useState(false)
  const [ tableState, setTableState ] = useState({})

  const initialFilter = [
    {
      id    : 'name',
      value : searchParams.get('name')
    },
    {
      id    : 'email',
      value : searchParams.get('email')
    },
    {
      id    : 'access',
      value : searchParams.get('access')
    },
    {
      id    : 'created_at',
      value : searchParams.get('sort_dir')
    }
  ]

  useEffect(() => {
    const searchFilter = Object.fromEntries(searchParams)
    Object.keys(searchFilter).forEach((key) => {
      initialFilter.push({ id: key, value: searchFilter[key] })
    })
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const handleFetchAdmins = useCallback(() => {
    setIsLoading(true)
    console.log(admins)
    // const tableFilters = {}

    // tableState.filters.map((filter) => {
    //   if (filter.id === 'created_at')
    //     tableFilters[ 'sort_dir' ] = filter.value
    //   else
    //     tableFilters[ filter.id ] = filter.value
    // })

    AdminsApiV2.get()
      .then((response) => {
        
        // setPagination(response.data.meta)
        // setIsLoading(false)
        console.log(response.data)
        setAdmins(response.data)
        console.log(admins)
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false))
  }, [  ]) // eslint-disable-line react-hooks/exhaustive-deps


  const handleDisableAdmin = useCallback((datum) => {
    AdminsApiV2.update({
      adminId      : datum.id,
      activeStatus : 'disabled'
    })
      .then(() => {
        pageUtils.setAlertMsg(
          `Admin with email ${datum.email} has been disabled`,
          ALERT_TYPES.SUCCESS
        )
        handleFetchAdmins()
      })
      .catch((error) => {
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }, [ pageUtils, handleFetchAdmins ])

  const handleEnableAdmin = useCallback((datum) => {
    AdminsApiV2.update({
      adminId      : datum.id,
      activeStatus : 'enabled'
    })
      .then(() => {
        pageUtils.setAlertMsg(
          `Admin with email ${datum.email} has been enabled`,
          ALERT_TYPES.SUCCESS
        )
        handleFetchAdmins()
      })
      .catch((error) => {
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }, [ pageUtils, handleFetchAdmins ])


  return (
    <>
      <TitlePage mainTitle={ 'Admin' } subTitle={ 'List' } />

      <Card>
        <AdminTable
          data={ admins }
          pagination={ pagination }
          onFetchData={ handleFetchAdmins }
          isLoading={ isLoading }
          rowButtonProps={{
            handleDisableAdmin : handleDisableAdmin,
            handleEnableAdmin  : handleEnableAdmin
          }}
          initialFilter={ initialFilter }
        />
      </Card>
    </>
  )
}

AdminListPage.propTypes = propTypes
export default AdminListPage
