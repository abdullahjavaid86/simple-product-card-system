import axios from "axios";

const apiInstance = axios.create({
  baseURL: `https://my-json-server.typicode.com/benirvingplt`,
});

apiInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export { apiInstance };
