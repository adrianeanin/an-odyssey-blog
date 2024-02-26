import axios from "axios";
const baseUrl = "https://powerful-tick-underwear.cyclic.app/api/blog";
// const baseUrl = "http://localhost:3000/api/blog";

const getPublishedPosts = async () => {
  try {
    const request = axios.get(`${baseUrl}/published-posts`);
    const response = await request;
    console.log("GET REQ");
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
  addComment,
};
