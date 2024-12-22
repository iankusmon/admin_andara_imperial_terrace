import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import PropTypes from 'prop-types'
import { Card, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert, Button } from 'reactstrap'
import NupApiV2 from 'api/v2/admins/nups-api-v2'
import RedirectButton from 'components/atoms/redirect-button'
import TitlePage from 'components/atoms/title-page'
import { ALERT_TYPES } from 'constants/alert-constants'
import StringUtils from 'utils/string-util'
import { Link } from 'react-router-dom'
import NupForm from 'domains/nup/organisms/nup-form/nup_form'

const TAB = {
  PROFILE   : 'profile',
}

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const NupEditPage = ({ pageUtils }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [nup, setNup] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true)
    console.log(id)
    NupApiV2.show(id)
      .then((response) => {
        setNup(response.data)
      })
      .catch((error) => {
        alert(error)
      })
      .finally(() => setIsLoading(false))
  },[ id ])


  const handleSubmitForm = async (values, formikBag) => {

    await NupApiV2.update(nup.id, values)
      .then(() => {
        pageUtils.setAlertMsg('The NUP has been edited.', ALERT_TYPES.SUCCESS)
      })
      .catch((error) => {
        formikBag.setErrors(error.response.data.messages)
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <TitlePage mainTitle={ 'NUP' } subTitle={ 'Edit' } />

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
      </Nav>

      <TabContent activeTab={ activeTab }>

        <TabPane tabId={ TAB.PROFILE }>

          <RedirectButton
            color='primary'
            size='sm'
            className='mb-4'
            text={ 'Back to list' }
            path={ '/app/super_admin/nups' }
          />

          <Row>
            <Col
              xs={ 12 }
              md={ 9 }
              lg={ 9 }
            >
              <Card body>
                <NupForm
                  nup={ nup }
                  handleSubmitForm={ handleSubmitForm }
                  buttonText={ 'SAVE' }
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

      </TabContent>


    </>
  )
}

NupEditPage.propTypes = propTypes

export default NupEditPage
