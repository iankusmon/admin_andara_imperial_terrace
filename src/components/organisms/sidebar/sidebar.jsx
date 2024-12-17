import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link, NavLink as NavLinkRRD, useLocation, useHistory } from 'react-router-dom'
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'
import AdminsApiV2 from 'api/v2/admins-api-v2.js'


const propTypes = {
  /** function used to make sidenav mini or normal */
  toggleSidebar : PropTypes.func,
  /** prop to know if the sidenav is mini or normal */
  isSidebarOpen : PropTypes.bool,
  /** links that will be displayed inside the component */
  routes        : PropTypes.arrayOf(PropTypes.object),
  /** Logo */
  logo          : PropTypes.shape({
    /** Logo name */
    name       : PropTypes.string,
    sup        : PropTypes.string,
    /** innerLink is for links that will direct the user within the app
      * it will be rendered as <Link to='...'>...</Link> tag
    */
    innerLink  : PropTypes.string,
    /** outterLink is for links that will direct the user outside the app
     *  it will be rendered as simple <a href='...'>...</a> tag
    */
    outterLink : PropTypes.string,
    /** the image src of the logo */
    imgSrc     : PropTypes.string.isRequired,
    /** the alt for the img */
    imgAlt     : PropTypes.string.isRequired
  })
}



const Sidebar = ({ logo, routes, isSidebarOpen, toggleSidebar }) => {

  const [ collapseStates, setCollapseStates ] = useState({})
  const history                               = useHistory()

  useEffect(() => {
    setCollapseStates({
      ...getCollapseStates(routes)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const location = useLocation()

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => location.pathname.indexOf(routeName) > -1 ? 'active' : ''

  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show')
    }
  }
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show')
    }
  }

  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {}
    routes.map((route) => {
      if (route.collapse) {
        initialState = {
          [route.state_key]: getCollapseInitialState(route.views),
          ...getCollapseStates(route.views),
          ...initialState
        }
      }
      return null
    })
    return initialState
  }
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true
      }
    }
    return false
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (window.innerWidth < 1080) {
      toggleSidebar()
    }
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => (
    routes.map((route, key) => {
      if (route.redirect) {
        return null
      }

      // hide a specific route. It will not be displayed in sidebar
      if (route.invisible) return null

      if (route.collapse) {
        var st                 = {}
        st[route['state_key']] = !collapseStates[route.state_key]
        return (
          <NavItem key={ key }>
            <NavLink
              data-toggle='collapse'
              aria-expanded={ collapseStates[route.state_key] }
              className={ classnames({
                active: getCollapseInitialState(route.views)
              }) }
              onClick={ (e) => {
                e.preventDefault()
                setCollapseStates((collapseState) => ({ ...collapseState, ...st }))
              } }
            >
              {
                route.icon ? (
                  <>
                    <i className={ route.icon } />
                    <span className='nav-link-text'>{ route.name }</span>
                  </>
                ) : route.miniName ? (
                  <>
                    <span className='sidenav-mini-icon'> { route.miniName } </span>
                    <span className='sidenav-normal'> { route.name } </span>
                  </>
                ) : <span> { route.name } </span>
              }

            </NavLink>
            <Collapse isOpen={ collapseStates[route.state_key] }>
              <Nav className='nav-sm flex-column'>
                { createLinks(route.views) }
              </Nav>
            </Collapse>
          </NavItem>
        )
      }
      return (
        <NavItem
          className={ activeRoute(route.layout + route.path) }
          key={ key }
        >
          <NavLink
            to={ route.layout + route.path }
            activeClassName=''
            onClick={ closeSidenav }
            tag={ NavLinkRRD }
          >
            { route.icon !== undefined ? (
              <>
                <i className={ route.icon } />
                <span className='nav-link-text'>{ route.name }</span>
              </>
            ) : route.miniName !== undefined ? (
              <>
                <span className='sidenav-mini-icon'> { route.miniName } </span>
                <span className='sidenav-normal'> { route.name } </span>
              </>
            ) : (
              route.name
            ) }
          </NavLink>
        </NavItem>
      )
    })
  )


  const handleLogout = async () => {
    await AdminsApiV2.logout()
      .then(() => {
        history.go('/')
      })
      .catch((error) => {
        // user already logged out
        if (error.response.status == 401) {
          history.go('/')
        }
        else (
          alert(error.message)
        )
      })
  }

  const handleUpdatePassword = async () => {
    history.push('/app/update-password')
  }

  const ScrollBarInner = () => (
    <div className='scrollbar-inner'>

      { /* Sidebar Header */ }
      <div className='sidenav-header d-flex align-items-center'>
        <NavbarBrand
          tag={ Link }
          name={ logo.name }
          sup={ logo.sup }
          to={ '/' }
        >
          <img height={ 28 } src={ logo.imgSrc }/>
          <span className='ml-3'>{ logo.name }</span>
          { logo.sup && <sup className='font-weight-light'>{ logo.sup }</sup> }
        </NavbarBrand>

        <div className='ml-auto'>
          <div
            className={ classnames('sidenav-toggler d-none d-xl-block', {
              active: isSidebarOpen
            }) }
            onClick={ toggleSidebar }
          >
            <div className='sidenav-toggler-inner'>
              <i className='sidenav-toggler-line' />
              <i className='sidenav-toggler-line' />
              <i className='sidenav-toggler-line' />
            </div>
          </div>
        </div>
      </div>


      <div className='navbar-inner'>
        <Collapse navbar isOpen={ true }>
          <Nav navbar>
            { createLinks(routes) }
          </Nav>
          <hr className='my-3' />
          <Nav className='mb-md-3' navbar>
            <NavItem onClick={ handleUpdatePassword }>
              <NavLink>
                <Button outline block color='secondary' size={ 'sm' }>
                  <span className='nav-link-text'>
                    { 'Update Password' }
                  </span>
                </Button>
              </NavLink>
            </NavItem>
            <NavItem onClick={ handleLogout }>
              <NavLink>
                <Button outline block color='primary' size={ 'sm' }>
                  <i className='fas fa-sign-out-alt'></i>
                  <span className='nav-link-text'>
                    { 'Logout' }
                  </span>
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </div>
  )

  const ScrollBarBody = () => {
    const isPerfectScrollbarSupported = navigator.platform.indexOf('Win') > -1
    if (isPerfectScrollbarSupported) {
      return (
        <PerfectScrollbar>
          <ScrollBarInner/>
        </PerfectScrollbar>
      )
    }
    return <ScrollBarInner/>
  }

  return (
    <Navbar
      className={
        'sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left'
      }
      onMouseEnter={ onMouseEnterSidenav }
      onMouseLeave={ onMouseLeaveSidenav }
    >
      <ScrollBarBody/>
    </Navbar>
  )
}

Sidebar.defaultProps = {
  routes        : [ {} ],
  toggleSidebar : () => {},
  isSidebarOpen : false
}

Sidebar.propTypes = propTypes

export default Sidebar
