import QueryParamsUtil from 'api/utils/query-params-util'
import axios from 'axios'

const API_PATH = 'api/admins'

const AdminsApiV2 = {
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

  get: async () => {
    const path   = API_PATH
    // const params = QueryParamsUtil.format(tableState, filters)

    const response = axios.get(path)
    return response
  },


  update: async ({ adminId, activeStatus }) => {
    const path     = `${API_PATH}/${adminId}`
    const payload  = {
      admin: {
        active_status: activeStatus
      }
    }
    const response = axios.patch(path, payload)
    return response
  },

  create: async (admin_attributes) => {
    const path     = API_PATH
    const payload  = {
      admin: admin_attributes
    }
    const response = axios.post(path, payload)
    return response
  },

  updatePassword: async ({ current_password, new_password, password_confirmation }) => {
    const path = [
      API_PATH,
      'update_password'
    ].join('/')

    const body = {
      admin: {
        current_password      : current_password,
        new_password          : new_password,
        password_confirmation : password_confirmation
      }
    }

    const response = axios.patch(path, body)
    return response
  },

  profile: async () => {
    const path     = `${API_PATH}/profile`
    const response = axios.get(path)
    return response
  },

  logout: async () => {
    const path     = `${API_PATH}/logout`
    const response = axios.delete(path)
    return response
  }

}

export default AdminsApiV2