import QueryParamsUtil from 'api/utils/query-params-util';
import axios from 'axios';

const API_PATH = 'api/admins/cms/homepages/sections/main_banners';

const CmsHomepagesSectionsMainBannersAPI = {

  get: async ({ tableState, filters }) => {
    const path   = API_PATH;
    const params = QueryParamsUtil.format(tableState, filters);

    const response = await axios.get(path, { params });
    return response;
  },
};

export default CmsHomepagesSectionsMainBannersAPI;
