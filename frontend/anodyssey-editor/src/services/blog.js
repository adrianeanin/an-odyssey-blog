import axios from "axios";
const baseUrl = "http://localhost:3000/api/blog";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getPublishedPosts = async () => {
  const request = axios.get(`${baseUrl}/published-posts`);
  const response = await request;
  return response.data;
};

const getAllPosts = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(`${baseUrl}/posts`, config);
  const response = await request;
  return response.data;
};

const getPost = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/create-post`,
    newObject,
    config
  );
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/posts/${id}`, newObject, config);
  const response = await request;
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/posts/${id}`, config);
  return response.data;
};

export default {
  getAllPosts,
  getPost,
  getPublishedPosts,
  create,
  update,
  remove,
  setToken,
};
