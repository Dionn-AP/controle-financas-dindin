import axios from 'axios';

export default axios.create({
  baseURL: 'https://application-dindin.onrender.com',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});
