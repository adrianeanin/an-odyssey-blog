import axios from "axios";
const baseUrl = "http://localhost:3000/api/blog";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getPublishedPosts = async () => {
  try {
    const request = axios.get(`${baseUrl}/published-posts`);
    const response = await request;
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const getPost = async (id) => {
  try {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const addComment = async (id, newObject) => {
  try {
    const response = await axios.post(
      `${baseUrl}/posts/${id}/comments`,
      newObject
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export default {
  getPost,
  getPublishedPosts,
  setToken,
  addComment,
};
