import axios from "axios";
import { apiURL } from "../constants";

const UserApi =  {
    getAll: () => {
        return axios.get(`${apiURL}/users/all`)
    },
    getUserId: (_id) => {
        return axios.get(`${apiURL}/users/id/${_id}`)
    },
    addUser: (data) => {
        return axios.post(`${apiURL}/users/add`, data)
    },
    updateUser: (_id, data) => {
        return axios.patch(`${apiURL}/users/update/${_id}`, data)
    },
    deleteUser: (_id) => {
        return axios.delete(`${apiURL}/users/delete/${_id}`)
    },
    updateStatus: (_id, data)=>{
        return axios.patch(`${apiURL}/users/update/status/${_id}`, data)
    }
}

export default UserApi;