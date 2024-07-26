import axios from 'axios';

const API_URL = 'http://localhost:8080'; 

export const login = async (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

export const register = async (username, password, mail) => {
    return axios.post(`${API_URL}/register`, { username, password, mail });
};

export const deleteUser = (userId) => {
  return axios.delete(`http://localhost:8080/users/${userId}`, { withCredentials: true });
};

export const getUsers = async () => {
  try {
      const response = await axios.get(`${API_URL}/users`, {
          withCredentials: true
      });
      return response; 
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};

export const getWelcome = async () => {
    return axios.get(`${API_URL}/welcome`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` } });
};

export const addPost = (postData) => {
  return axios.post(`${API_URL}/posts/add-post`, postData, {
      params: { authorId: 1 }, 
      withCredentials: true,
  });
};

export const getAllPosts = () => {
  return axios.get(`${API_URL}/posts`, { withCredentials: true });
};

