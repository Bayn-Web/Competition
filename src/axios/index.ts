import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  headers: { 'token': localStorage.getItem("token") },
  timeout: 9000,
})

export default service
