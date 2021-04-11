import axios from 'axios'

const instance = axios.create({
    baseURL: "https://webchatt-backend.herokuapp.com/"
})

export default instance

