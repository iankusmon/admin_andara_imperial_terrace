import AppRoutes from 'components/app/app-routes'
import Navbar from 'components/organisms/navbar'
import Sidebar from 'components/organisms/sidebar'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import routes from 'routes'
import WithAlert from 'hocs/with-alert'
import PropTypes from 'prop-types'
// import tlIcon from 'assets/img/tl-icon.png'

const propTypes = {
  setAlertMsg    : PropTypes.func,
  setApiErrorMsg : PropTypes.func
}

const App = ({ setAlertMsg, setApiErrorMsg }) => {

  // Sidebar default to be shown and pinned
  useEffect(() => {
    document.body.classList.add('g-sidenav-show')
    document.body.classList.add('g-sidenav-pinned')
  },[])

  // Sidebar
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(true)
  const toggleSidebar                       = () => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned')
      document.body.classList.add('g-sidenav-hidden')
    } else {
      document.body.classList.add('g-sidenav-pinned')
      document.body.classList.remove('g-sidenav-hidden')
    }
    setIsSidebarOpen(!isSidebarOpen)
  }

  // To handle closing of sidebar when clicking on the right of the sidebar
  const SidebarBackdrop = () => {
    if (isSidebarOpen) return <div className="backdrop d-xl-none" onClick={ toggleSidebar } />
    return null
  }

  return (
    <>
      <Sidebar
        routes={ routes }
        toggleSidebar={ toggleSidebar }
        isSidebarOpen={ isSidebarOpen }
        logo={{
          name      : 'Admin Dashboard',
          sup       : '',
          innerLink : '/',
          // imgSrc    : tlIcon,
          imgAlt    : '...'
        }}
      />
      <div className='main-content'>
        <Navbar
          toggleSidenav={ toggleSidebar }
          sidenavOpen={ isSidebarOpen }
          brandText={ 'bbrand text' }
        />

        <Container fluid className='mt-3 mb-6'>
          <Row>
            <Col>
              <AppRoutes
                routes={ routes }
                pageUtils={{
                  setAlertMsg    : setAlertMsg,
                  setApiErrorMsg : setApiErrorMsg
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <SidebarBackdrop/>
    </>
  )
}

App.propTypes = propTypes

export default WithAlert(App)
