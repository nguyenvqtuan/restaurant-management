import axios from 'axios'
import config from '../../../config.json'

export default axios.create({
    baseURL: config.SERVER
})

export const axiosPrivate = axios.create({
    baseURL: config.SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});