import axios from 'axios';

const API_URL = 'https://reqres.in/api';
const API_KEY = 'reqres-free-v1';

const getHeaders = () => ({
  'x-api-key': API_KEY,
  'Content-Type': 'application/json'
});


export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/register`,
      { email, password },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
