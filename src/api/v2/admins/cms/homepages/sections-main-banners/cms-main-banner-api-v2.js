import QueryParamsUtil from 'api/utils/query-params-util';
import axios from 'axios';

const API_PATH = 'api/admins/cms/homepages/sections/main_banners';

const CmsHomepagesSectionsMainBannersAPI = {

  get: async ({ tableState, filters }) => {
    const path = API_PATH;
    const params = QueryParamsUtil.format(tableState, filters);

    const response = await axios.get(path, { params });
    return response;
  },

  create: async (banners_attributes) => {
    const path = API_PATH;
    const payload = {  
      cms_homepage_section_main_banner: banners_attributes
    };
    const response = await axios.post(path, payload);
    return response;
  },

  show: async (id) => {
    const path = `${API_PATH}/${id}`;
    const response = await axios.get(path);
    return response;
  },

  update: async (id, values) => {
    const path = `${API_PATH}/${id}`;
    const response = await axios.patch(path, values);
    return response;
  },

  replace: async (id, values) => {
    const path = `${API_PATH}/${id}`;
    const response = await axios.put(path, values);
    return response;
  },

  destroy: async (id) => {
    const path = `${API_PATH}/${id}`;
    const response = await axios.delete(path);
    return response;
  }
};

export default CmsHomepagesSectionsMainBannersAPI;
