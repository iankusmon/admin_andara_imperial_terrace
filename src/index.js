import 'assets/css/index.min.css'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/select2/dist/css/select2.min.css'
import 'assets/vendor/sweetalert2/dist/sweetalert2.min.css'
import 'react-notification-alert/dist/animate.css'
import React from 'react'
import ReactDOM from 'react-dom'
// Theme Specific Styles
import 'react-perfect-scrollbar/dist/css/styles.css'
import { BrowserRouter } from 'react-router-dom'
import AppWrapper from './app-wrapper.jsx'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
