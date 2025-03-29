import axios from "axios";
import { base_url } from "../utils/Base_url";
import { getToken, logoutUser } from "./authService";
const apiClient = axios.create({
    baseURL: base_url,
        headers: {
          'Content-Type': 'application/json',
        },
  });
  
  // Add token to headers
  apiClient.interceptors.request.use(
    (config) => {
      if(config.url=="/login" || config.url=="/signUp")
      {
        console.log("worked")
        return config
      }
      else{
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config)
      return config;
      }
    },
    (error) => Promise.reject(error)
  );
  
  // Handle token errors globally (401 Unauthorized)
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("error coming")
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 400) {
            // logoutUser();
        } else if (error.response.status === 403) {
          alert('You do not have permission to access this resource.');
          // logoutUser();
        } else if (error.response.status >= 500) {
          alert('Server error, please try again later.');
        }
      }
      return Promise.reject(error);
    }
  );
  
  // Export API methods
  export const apiGet = async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      console.error("API GET request failed", error);
      throw error; // Rethrow error for further handling
    }
  };
  
  export const apiPost = async (url,data,config = {}) => {
    try {
      const response = await apiClient.post(url,data,config);
      console.log(response.data);
      console.log("post worked")
      return response;
    } catch (error) {
      console.error("API POST request failed", error);
      throw error;
    }
  };
  export const apiPut = async (url, data, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error("API PUT request failed", error);
      throw error;
    }
  };
  
  export const apiDelete = async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      console.error("API DELETE request failed", error);
      throw error;
    }
  };
  