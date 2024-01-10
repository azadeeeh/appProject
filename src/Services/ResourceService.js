import axios from 'axios';

// The base URL of MockAPI for resources operations
const BASE_URL = 'https://6577ba0a197926adf62eb73e.mockapi.io/ReactApp';

const ResourceService = {
  // Async function to get all posts. When it fails it throws a new object of Error class
  getAll: async () => {
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
  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/resource/${id}`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch resources');
    }
  },

  /**
   * Async function which adds a new resource to database
   * @param {*} resource 
   */
  add: async (resource) => {
    try {
      const response = await axios.post(`${BASE_URL}/resource`, resource, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add resource');
    }
  },

  /**
     * Async function which updates a given resource 
     * @param {*} updatedresource resource with with new values. (The id should not be changed)
     */
  update: async (updatedresource) => {
    try {
      const response = await axios.put(`${BASE_URL}/resource/${updatedresource.id}`, updatedresource, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update resource');
    }
  },

  // Async function which deletes a resource according to the given ID
  delete: async (id) => {
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
