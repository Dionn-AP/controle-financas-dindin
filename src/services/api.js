import axios from 'axios';

export default axios.create({
  baseURL: 'https://my-dindin.onrender.com',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});
