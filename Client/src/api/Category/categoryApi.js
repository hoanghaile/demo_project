import axios from 'axios';
import { apiURL } from '../constants';

const CateApi = {
    getAll: () => {
        return axios.get(`${apiURL}/category/all`)
    },

    getById: (_id) => {
        return axios.get(`${apiURL}/category/id/${_id}`)
    },

    addCategory: (data) => {
        return axios.post(`${apiURL}/category/add`, data)
    },

    updateCategory: (_id, data) => {
        return axios.patch(`${apiURL}/category/update/${_id}`, data )
    },

    deleteCategory: (_id) => {
        return axios.delete(`${apiURL}/category/delete/${_id}`)
    }
}

export default CateApi