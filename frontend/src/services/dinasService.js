import api from './api';

const dinasService = {
  // Get all pengurus BEM
  getAllPengurus: async () => {
    const response = await api.get('/pengurus-bem');
    return response.data;
  },

  // Get pengurus by ID
  getPengurusById: async (id) => {
    const response = await api.get(`/pengurus-bem/${id}`);
    return response.data;
  },

  // Create pengurus (with file upload)
  createPengurus: async (formData) => {
    const response = await api.post('/pengurus-bem', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update pengurus
  updatePengurus: async (id, formData) => {
    const response = await api.patch(`/pengurus-bem/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete pengurus
  deletePengurus: async (id) => {
    const response = await api.delete(`/pengurus-bem/${id}`);
    return response.data;
  },

  // Get all bidang
  getAllBidang: async () => {
    const response = await api.get('/bidang');
    return response.data;
  },

  // Get all kategori dinas
  getAllKategoriDinas: async () => {
    const response = await api.get('/kategori-dinas');
    return response.data;
  },

  // Get members by dinas ID
  getDinasMembers: async (dinasId) => {
    const response = await api.get(`/pengurus-bem/dinas/${dinasId}`);
    return response.data;
  },

  // Get dinas info by ID
  getDinasInfo: async (dinasId) => {
    const response = await api.get(`/kategori-dinas/${dinasId}`);
    return response.data;
  },

  // Create kategori dinas
  createKategoriDinas: async (data) => {
    const response = await api.post('/kategori-dinas', data);
    return response.data;
  },

  // Update kategori dinas
  updateKategoriDinas: async (id, data) => {
    const response = await api.patch(`/kategori-dinas/${id}`, data);
    return response.data;
  },

  // Delete kategori dinas
  deleteKategoriDinas: async (id) => {
    const response = await api.delete(`/kategori-dinas/${id}`);
    return response.data;
  },

  // Create bidang
  createBidang: async (data) => {
    const response = await api.post('/bidang', data);
    return response.data;
  },

  // Update bidang
  updateBidang: async (id, data) => {
    const response = await api.patch(`/bidang/${id}`, data);
    return response.data;
  },

  // Delete bidang
  deleteBidang: async (id) => {
    const response = await api.delete(`/bidang/${id}`);
    return response.data;
  },
};

export default dinasService;