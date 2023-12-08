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

const getAllPosts = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const request = axios.get(`${baseUrl}/posts`, config);
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

const create = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(
      `${baseUrl}/create-post`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.put(
      `${baseUrl}/posts/${id}`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const togglePublish = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/posts/${id}/toggle-publish`,
    newObject,
    config
  );
  return response.data;
};

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/posts/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export default {
  getAllPosts,
  getPost,
  getPublishedPosts,
  create,
  update,
  togglePublish,
  remove,
  setToken,
};
