import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'//'http://10.200.90.61:3333'
});



export default api;