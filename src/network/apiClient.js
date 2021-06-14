import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://what-i-desire-default-rtdb.firebaseio.com/users',
  headers: {
    'Accept': 'application.json',
    'Content-Type': 'application.json'
  }
});

export default axiosClient;