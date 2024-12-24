import QueryParamsUtil from 'api/utils/query-params-util'
import axios from 'axios'

const API_PATH = 'api/admins/down_payments'

const DownPaymentApiV2 = {
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

    const response = axios.get(path, { params })
    return response
  },

  create: async (down_payment_attributes) => {
    const path     = API_PATH
    const payload  = {  
      down_payment: down_payment_attributes
    }
    const response = axios.post(path, payload)
    return response
  },

  /**
   * Get one `DownPayement`
   * @param {object} id DownPayement id
   * @return {object} `down_payment`
   */
  show: async (id) => {
    const path     = `${API_PATH}/${id}`
    const response = axios.get(path)
    return response
  },

  /**
   * update `BookingFee` profile data
   * @param {number} id BookingFee id
   * @param {object} values values for BookingFee update
   * @return {object} `BookingFee`
   */
  update: async (id, values) => {
    const path = `${API_PATH}/${id}`

    const response = axios.patch(path, values)
    return response
  }
}

export default DownPaymentApiV2
