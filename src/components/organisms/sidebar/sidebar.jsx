import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, NavLink as NavLinkRRD, useLocation, useHistory } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import AdminsApiV2 from 'api/v2/admins-api-v2.js';
import Logo from '../../../assets/img/Logo-AIT.png';
import './sidebar.css';

const propTypes = {
  toggleSidebar: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    name: PropTypes.string,
    sup: PropTypes.string,
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

const Sidebar = ({ logo, routes, isSidebarOpen, toggleSidebar }) => {
  const [collapseStates, setCollapseStates] = useState({});
  const history = useHistory();

  useEffect(() => {
    setCollapseStates({
      ...getCollapseStates(routes),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();

  const activeRoute = (routeName) => (location.pathname.indexOf(routeName) > -1 ? 'active' : '');

  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show');
    }
  };

  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show');
    }
  };

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((route) => {
      if (route.collapse) {
        initialState = {
          [route.state_key]: getCollapseInitialState(route.views),
          ...getCollapseStates(route.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };

  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  const closeSidenav = () => {
    if (window.innerWidth < 1080) {
      toggleSidebar();
    }
  };

  const createLinks = (routes) =>
    routes.map((route, key) => {
      if (route.redirect) {
        return null;
      }
      if (route.invisible) return null;

      if (route.collapse) {
        const st = {};
        st[route['state_key']] = !collapseStates[route.state_key];
        return (
          <NavItem key={key}>
            <NavLink
              data-toggle="collapse"
              aria-expanded={collapseStates[route.state_key]}
              className={classnames({
                active: getCollapseInitialState(route.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                setCollapseStates((collapseState) => ({ ...collapseState, ...st }));
              }}
            >
              {route.icon ? (
                <>
                  <i className={route.icon} />
                  <span className="nav-link-text">{route.name}</span>
                </>
              ) : route.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {route.miniName} </span>
                  <span className="sidenav-normal"> {route.name} </span>
                </>
              ) : (
                <span> {route.name} </span>
              )}
            </NavLink>
            <Collapse isOpen={collapseStates[route.state_key]}>
              <Nav className="nav-sm flex-column">{createLinks(route.views)}</Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(route.layout + route.path)} key={key}>
          <NavLink
            to={route.layout + route.path}
            activeClassName=""
            onClick={closeSidenav}
            tag={NavLinkRRD}
          >
            {route.icon !== undefined ? (
              <>
                <i className={route.icon} />
                <span className="nav-link-text">{route.name}</span>
              </>
            ) : route.miniName !== undefined ? (
              <>
                <span className="sidenav-mini-icon"> {route.miniName} </span>
                <span className="sidenav-normal"> {route.name} </span>
              </>
            ) : (
              route.name
            )}
          </NavLink>
        </NavItem>
      );
    });

  const handleLogout = async () => {
    await AdminsApiV2.logout()
      .then(() => {
        history.go('/');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          history.go('/');
        } else {
          alert(error.message);
        }
      });
  };

  const handleUpdatePassword = async () => {
    history.push('/app/update-password');
  };
  const ScrollBarInner = () => (
    <div className="scrollbar-inner sidenav">
          <div className="sidenav-header">
              {/* Logo */}
              <div className="logo-container">
                  <img
                      src={Logo} // Pastikan path Logo benar
                      alt="Andara Imperial Terrace Logo"
                      className="sidebar-logo"
                  />
              </div>

              {/* Title and Subtitle */}
              <div className="text-container">
                  <span className="sidebar-title">Andara Imperial</span>
                  <span className="sidebar-title">Terrace</span>
                  <span className="sidebar-subtitle">Dashboard Utama</span>
              </div>
          </div>



        <div className="navbar-inner">
            <Collapse navbar isOpen={true}>
                <Nav navbar>{createLinks(routes)}</Nav>
            </Collapse>
        </div>
        <div className="sidenav-footer">
            <Button outline color="secondary" onClick={handleUpdatePassword}>
                Update Password
            </Button>
            <Button outline color="primary" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
            </Button>
        </div>
    </div>
);



  const ScrollBarBody = () => {
    const isPerfectScrollbarSupported = navigator.platform.indexOf('Win') > -1;
    if (isPerfectScrollbarSupported) {
      return (
        <PerfectScrollbar>
          <ScrollBarInner />
        </PerfectScrollbar>
      );
    }
    return <ScrollBarInner />;
  };

  return (
    <Navbar
      className={'sidenav navbar-vertical navbar-expand-xs navbar-light fixed-left'}
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      <ScrollBarBody />
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidebar: () => {},
  isSidebarOpen: false,
};

Sidebar.propTypes = propTypes;

export default Sidebar;
