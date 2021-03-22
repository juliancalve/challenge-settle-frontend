import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-18-215-160-61.compute-1.amazonaws.com:3100/api'
});

export default axiosInstance;
