import QueryParamsUtil from 'api/utils/query-params-util'
import axios from 'axios'

const API_PATH = 'api/admins/customers'

const CustomerApiV2 = {
  loginAdmin: async (email, password) => {
    // We set the baseUrl in /configs/axios-config.js already
    // Just specify path here
    const path     = `${API_PATH}/login`
    const body     = {
      email    : email,
      password : password
    }
    const response = axios.post(path, body)
    return response
  },

  get: async ({ tableState, filters }) => {
    const path   = API_PATH
    const params = QueryParamsUtil.format(tableState, filters)

    const response = axios.get(path, {params})
    return response
  },

  create: async (customer_attributes) => {
    const path     = API_PATH
    const payload  = {
      customer: customer_attributes
    }
    const response = axios.post(path, payload)
    return response
  },

  /**
   * Get one `Customer`
   * @param {object} id customer id
   * @return {object} `customer`
   */
  show: async (id) => {
    const path     = `${API_PATH}/${id}`
    const response = axios.get(path)
    return response
  },

/**
   * update `Customer` profile data
   * @param {number} id customer id
   * @param {object} values values for customer update
   * @return {object} `Customer`
   */
update: async (id, values) => {
  const path = `${API_PATH}/${id}`

  const response = axios.patch(path, values)
  return response
}



}

export default CustomerApiV2