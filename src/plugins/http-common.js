import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    "X-API-Key": `${process.env.VUE_APP_X_API_Key}`
  }
  
})

// export const HTTP = axios.create({
//   baseURL: `${process.env.VUE_APP_API_AUTH_URL}`,
//   params: {
//     "grant_type": `password`,
//     "client_id": `${process.env.VUE_APP_API_CLIENT_ID}`,
//     "client_secret": `${process.env.VUE_APP_API_CLIENT_SECRET}`,
//     "username": "albert_tieu\@yahoo.com",
//     "password": `${process.env.VUE_APP_API_PASSWORD}`
//   }
// })