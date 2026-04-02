import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/biit/sports',
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json',
  },
})

export default client; 