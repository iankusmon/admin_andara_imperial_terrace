import axios from 'axios'

const API_PATH = 'api/admins/cms/featured_sellers/home_page_sections'

const CmsFsPagesSectionsApiV2 = {
  /**
   * Get list of Cms Featured Seller landing page sections
   * Invoke `GET api/v2/admins/cms/fs_pages/sections'
   */
  get: async() => {
    const path = API_PATH

    const response = axios.get(path)
    return response
  },

  /**
   * Adds a Closet to a Section
   * Invoke `POST api/v2/admins/cms/fs_pages/sections/${sectionId}/add_closet'
   * @param {number} sectionId - selected Section ID
   * @param {number} closetId - selected Closet ID
   */
  addCloset: async(sectionId, closetId) => {
    const params   = {
      closet_id: closetId
    }
    const path     = `${API_PATH}/${sectionId}/add_closet`
    const response = axios.post(path, params)
    return response
  },

  /**
   * Deletes selected Closet from Section
   * Invoke `POST api/v2/admins/cms/fs_pages/sections/${sectionId}/delete_seller'
   * @param {number} sectionId - selected Section ID
   * @param {number} closetId - selected Closet ID
   */
  removeCloset: async(sectionId, closetId) => {
    const payload  = {
      closet_id: closetId
    }
    const path     = `${API_PATH}/${sectionId}/delete_closet`
    const response = axios.delete(path, { data: payload })
    return response
  },

  /**
   * Add new blog post to related article section
   * Invoke `POST api/v2/admins/cms/fs_pages/sections/${sectionId}/add_blog'
   * @param {number} sectionId - selected Section ID
   * @param {number} blogPostId - selected Blog Post ID
   */
  addBlogPost: async(sectionId, blogPostId) => {
    const params   = {
      blog_id: blogPostId
    }
    const path     = `${API_PATH}/${sectionId}/add_blog`
    const response = axios.post(path, params)
    return response
  },

  /**
   * Delete selected blog post from related article section
   * Invoke `DELETE api/v2/admins/cms/fs_pages/sections/${sectionId}/delete_blog'
   * @param {number} sectionId - selected Section ID
   * @param {number} blogPostId - selected Related Blog ID
   */
  removeBlogPost: async(sectionId, blogPostId) => {
    const payload  = {
      blog_id: blogPostId
    }
    const path     = `${API_PATH}/${sectionId}/delete_blog`
    const response = axios.delete(path, { data: payload })
    return response
  }
}

export default CmsFsPagesSectionsApiV2
