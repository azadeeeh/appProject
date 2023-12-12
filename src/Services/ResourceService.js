import axios from 'axios';

const BASE_URL = 'https://6577ba0a197926adf62eb73e.mockapi.io/ReactApp';

const ResourceService = {
  getAllResrouces: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/resource`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch resources');
    }
  },

  /**
   * 
   * @param {Number} id The ID for the resource to get
   * @returns resource associated with the given ID
   */
  getResourceWithId: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/resource/${id}`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch resources');
    }
  },

  addResource: async (resource) => {
    try {
      const response = await axios.resource(`${BASE_URL}/resource`, resource, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add resource');
    }
  },

  updateResource: async (updatedresource) => {
    try {
      const response = await axios.put(`${BASE_URL}/resource/${updatedresource.id}`, updatedresource, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update resource');
    }
  },

  deleteResource: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/resource/${id}`, {
        headers: { 'content-type': 'application/json' }
      });
    } catch (error) {
      throw new Error('Failed to delete resource');
    }
  },
};

export default ResourceService;
