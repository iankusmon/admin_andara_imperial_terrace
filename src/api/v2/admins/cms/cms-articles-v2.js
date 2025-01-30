import QueryParamsUtil from 'api/utils/query-params-util'
import axios from 'axios'

const API_PATH = 'api/admins/articles'

const CmsArticlesAPIV2 = {

  get: async ({ tableState, filters }) => {
    const path   = API_PATH
    const params = QueryParamsUtil.format(tableState, filters)

    const response = axios.get(path, { params })
    return response
  },

  create: async (articles_attributes) => {
    const path     = API_PATH
    const payload  = {  
      cms_article: articles_attributes
    }
    const response = axios.post(path, payload)
    return response
  },

  /**
   * Get one `BookingFee`
   * @param {object} id BookingFee id
   * @return {object} `cms_article`
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

export default CmsArticlesAPIV2
