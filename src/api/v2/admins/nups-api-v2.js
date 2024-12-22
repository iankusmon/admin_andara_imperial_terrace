import QueryParamsUtil from 'api/utils/query-params-util'
import axios from 'axios'

const API_PATH = 'api/admins/nups'

const NupApiV2 = {
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

  create: async (nup_attributes) => {
    const path     = API_PATH
    const payload  = {  
      nup: nup_attributes
    }
    const response = axios.post(path, payload)
    return response
  },

  /**
   * Get one `Nup`
   * @param {object} id Nup id
   * @return {object} `nup`
   */
  show: async (id) => {
    const path     = `${API_PATH}/${id}`
    const response = axios.get(path)
    return response
  },

  /**
   * update `Nup` profile data
   * @param {number} id Nup id
   * @param {object} values values for Nup update
   * @return {object} `Nup`
   */
  update: async (id, values) => {
    const path = `${API_PATH}/${id}`

    const response = axios.patch(path, values)
    return response
  }
}

export default NupApiV2
