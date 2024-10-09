import axios from "axios"

//这里是直接请求URL吗
const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 50000,
});

//这里可以不导出吗？
export default request