import axios from 'axios';

const BASE_URL = 'https://656d0381e1e03bfd572ee9ba.mockapi.io/ReactApp';
// const BASE_URL = 'https://656d0381e1e03bfd572ee9b.mockapi.io/ReactApp';

const PostService = {
  getAllPosts: async () => {
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
   * 
   * @param {Number} id The ID for the post to get
   * @returns post associated with the given ID
   */
  getPostWithId: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/hobby/${id}`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },

  addPost: async (post) => {
    try {
      const response = await axios.post(`${BASE_URL}/hobby`, post, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add post');
    }
  },

  updatePost: async (updatedPost) => {
    try {
      const response = await axios.put(`${BASE_URL}/hobby/${updatedPost.id}`, updatedPost, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  },

  deletePost: async (id) => {
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
