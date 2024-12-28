import QueryParamsUtil from 'api/utils/query-params-util'
import axios from 'axios'

const API_PATH = 'api/admins/ppjb_documents'

const PpjbDocumentApiV2 = {
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

  create: async (ppjb_document_attributes) => {
    const path     = API_PATH
    const payload  = {  
      ppjb_document: ppjb_document_attributes
    }
    const response = axios.post(path, payload)
    return response
  },

  /**
   * Get one `BookingFee`
   * @param {object} id BookingFee id
   * @return {object} `ppjb_document`
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

export default PpjbDocumentApiV2
