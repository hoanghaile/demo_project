import axios from "axios";
import { apiURL } from '../constants';

const SendApi = {
    getAll: () => {
        return axios.get(`${apiURL}/send/all`)
    },
    getById: (_id)=>{
        return axios.get(`${apiURL}/send/id/${_id}`)
    },
    addSend: (data)=>{
        return axios.post(`${apiURL}/send/add`, data)
    },
    updateSend: (_id, data)=>{
        return axios.patch(`${apiURL}/send/update/${_id}`, data)
    },
    deleteSend: (_id) => {
        return axios.delete(`${apiURL}/send/delete/${_id}`)
    },
    updateStatus: (_id, data) => {
        return axios.patch(`${apiURL}/send/update/status/${_id}`, data)
    }
}

export default SendApi;