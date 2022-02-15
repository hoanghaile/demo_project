// import axiosConfig from "../axiosConfig";
import axios from "axios"
import { apiURL } from '../constants';

const authApi = {
    login: (data) => {
        return axios.post(`${apiURL}/auth/login`, data)
    },
    register: (data) => {
        return axios.post(`${apiURL}/auth/register`, data)
    },
    getAdmin: () => {
        return axios.get(`${apiURL}/auth/admin/all`)
    },
    getById: (_id) => {
        return axios.get(`${apiURL}/auth/admin/${_id}`)
    },
    updateAdmin: (_id, data) => {
        return axios.patch(`${apiURL}/auth/admin/update/${_id}`, data)
    },
    deleteAdmin: (_id) => {
        return axios.delete(`${apiURL}/auth/admin/delete/${_id}`)  
    },
    updateStatus: (_id, data) => {
        return axios.patch(`${apiURL}/auth/admin/update/status/${_id}`, data)
    },
    changePass: (_id,data) => {
        return axios.patch(`${apiURL}/auth/admin/change-pass/${_id}`)
    },
    mailChange: (data) => {
        return axios.post(`${apiURL}/auth/admin/send-mail`,data)
    },
}
export default authApi;