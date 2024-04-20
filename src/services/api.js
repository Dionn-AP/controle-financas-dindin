import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000',
  //baseURL: 'https://application-dindin.onrender.com',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});
