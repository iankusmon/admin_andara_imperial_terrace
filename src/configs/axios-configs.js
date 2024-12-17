import axios from 'axios'

// Axios Defaults
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Authentication using CSRF for non-GET Requests
axios.defaults.xsrfCookieName  = 'CSRF_TOKEN'
axios.defaults.xsrfHeaderName  = 'X-CSRF-Token'
axios.defaults.withCredentials = true

// API Base URL
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

// axios.interceptors.request.use((request) => {
//   console.log('Starting Request', request)
//   return request
// })

// axios.interceptors.response.use((response) => {
//   console.log('Response:', response)
//   return response
// })
