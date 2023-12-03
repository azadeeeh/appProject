import axios from 'axios';

const BASE_URL = 'https://654166c1f0b8287df1fe51c2.mockapi.io';

const PostService = {
  getAllPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/hobby`, {
        headers: { 'content-type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch hobbies');
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

  updatePost: async (id, updatedPost) => {
    try {
      const response = await axios.put(`${BASE_URL}/hobby/${id}`, updatedPost, {
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
