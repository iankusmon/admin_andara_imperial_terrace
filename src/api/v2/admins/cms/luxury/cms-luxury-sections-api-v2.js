import axios from 'axios'

const API_PATH = 'api/admins/cms/luxury_page_sections'

const CmsLuxurySectionsApiV2 = {

  /**
   * Get list of Cms Luxury Sections
   * Invoke `GET api/v2/admins/cms/luxury_page_sections'
   */
  get: async () => {
    const path = API_PATH

    const response = await axios.get(path, { })
    return response
  },

  /**
   * Show Cms Luxury Section contents
   * Invoke `GET api/v2/admins/cms/luxury_page_sections/:id'
   * @param {string} id - id of section
   */
  show: async (id) => {
    const path = `${API_PATH}/${id}`

    const response = await axios.get(path, { })
    return response
  },

  /**
   * Update the contents of selected Luxury Section
   * Invoke `PATCH api/v2/admins/cms/luxury_page_sections/:id'
   * @param {string} id - id of section
   * @param {object} payload - values of all params get from a formik
   */
  update: async (id, payload) => {
    const path = `${API_PATH}/${id}`

    const response = axios.patch(path, payload)

    return response
  }
}

export default CmsLuxurySectionsApiV2
