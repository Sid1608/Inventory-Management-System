import axios from 'axios';

// const instance= axios.create({
//     baseURL: 'http://localhost:8080'
// })
// const BASE_URL = "http://localhost:8080/"
const BASE_URL = "https://inventory-backend-v1.herokuapp.com/"


export const publicRequest=axios.create({
    baseURL: BASE_URL
});
