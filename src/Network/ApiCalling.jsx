import axios from "axios";
export const BASE_URL = "http://localhost:1337/api";
const axiosInstance = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://localhost:1337/api",

  timeout: 5000,
});

export const get = async (url, params = {},headers) => {
  try {
    const response = await axiosInstance.get(url, {
      params,
      headers: {
        ...headers,
        // Add any other headers you need
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (url, data) => {
  try {
    const response = await axiosInstance.delete(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editData = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
