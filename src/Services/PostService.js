import axios from 'axios';

// The base URL of MockAPI for Posts operations
const BASE_URL = 'https://656d0381e1e03bfd572ee9ba.mockapi.io/ReactApp';

const PostService = {
  // Async function to get all posts. When it fails it throws a new object of Error class
  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/hobby`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },

  /**
   * Async function to get a post by its ID
   * @param {Number} id The ID for the post to get
   * @returns post associated with the given ID
   */
  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/hobby/${id}`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },

  /**
   * Async function which adds a new post to database
   * @param {*} post 
   */
  add: async (post) => {
    try {
      const response = await axios.post(`${BASE_URL}/hobby`, post, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add post');
    }
  },

  /**
   * Async function which updates a given post 
   * @param {*} updatedPost post with with new values. (The id should not be changed)
   */
  update: async (updatedPost) => {
    try {
      const response = await axios.put(`${BASE_URL}/hobby/${updatedPost.id}`, updatedPost, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  },

  // Async function which deletes a post according to the given ID
  delete: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/hobby/${id}`, {
        headers: { 'content-type': 'application/json' }
      });
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  },
};

export default PostService;
