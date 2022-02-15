import axios from "axios";
import { apiURL } from '../constants';

const SendApi = {
    getAll: () => {
        return axios.get(`${apiURL}/take/all`)
    },
    getById: (_id)=>{
        return axios.get(`${apiURL}/take/id/${_id}`)
    },
    addTake: (data)=>{
        return axios.post(`${apiURL}/take/add`, data)
    },
    updateTake: (_id, data)=>{
        return axios.patch(`${apiURL}/take/update/${_id}`, data)
    },
    deleteTake: (_id) => {
        return axios.delete(`${apiURL}/take/delete/${_id}`)
    },
    updateStatus: (_id, data) => {
        return axios.patch(`${apiURL}/take/update/status/${_id}`, data)
    }
}

export default SendApi;