import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-54-196-24-254.compute-1.amazonaws.com:3100/api'
    // baseURL: 'http://localhost:3100/api'
});

export default axiosInstance;
