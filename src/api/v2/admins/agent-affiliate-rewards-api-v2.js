// AgentAffiliateAffiliatesApi.js
import axios from 'axios';

const API_PATH = '/api/admins/agent_affiliates';

const AgentAffiliateAffiliatesApi = {
  // Mendapatkan detail agent affiliate berdasarkan ID
  show: async (id) => {
    const path = `${API_PATH}/${id}`;  // Pastikan format URL menggunakan ID sebagai angka
    const response = await axios.get(path);
    return response;  // Mengembalikan seluruh respons
  }
};

export default AgentAffiliateAffiliatesApi;
