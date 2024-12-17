
// nodejs library that concatenates classes
import classnames from 'classnames'
import UserMedia from 'components/molecules/user-media'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'
import { useAuth } from 'providers/auth-provider'
// reactstrap components
import { Collapse, Container, Nav, Navbar as RSNavbar, NavItem } from 'reactstrap'

const Navbar = (props) => {
  const { user } = useAuth()
  return (
    <>
      <RSNavbar
        className="navbar-top navbar-expand border-bottom navbar-light bg-secondary"
      >
        <Container fluid>
          <Collapse navbar isOpen={ true }>
            <Nav className="align-items-center" navbar>
              { /* Nav icon on mobile */ }
              <NavItem className="d-xl-none">
                <div
                  className={ classnames(
                    'pr-3 sidenav-toggler',
                    { active: props.sidenavOpen }
                  ) }
                  onClick={ props.toggleSidenav }
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-center ml-md-auto" navbar>
              <UserMedia user={ user }/>
            </Nav>
          </Collapse>
        </Container>
      </RSNavbar>
    </>
  )
}
Navbar.defaultProps = {
  toggleSidenav : () => {},
  sidenavOpen   : false,
  theme         : 'dark'
}
Navbar.propTypes    = {
  toggleSidenav : PropTypes.func,
  sidenavOpen   : PropTypes.bool,
  theme         : PropTypes.oneOf([ 'dark', 'light' ])
}

export default Navbar
