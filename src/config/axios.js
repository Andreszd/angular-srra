import axios from 'axios' 

const clientAxios = axios.create({
    baseURL: 'https://localhost:44372/'
})

export default clientAxios