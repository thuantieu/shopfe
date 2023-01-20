import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    "X-API-Key": `${process.env.VUE_APP_X_API_Key}`
  }
  
})
