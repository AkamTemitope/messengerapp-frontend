import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.ENDPOINT
})

export default instance

