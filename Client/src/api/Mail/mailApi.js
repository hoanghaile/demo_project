import axios from 'axios';
import { apiURL } from '../constants';

const mailApi = {
    sendMail: (data) => {
        return axios.post(`${apiURL}/email/send-mail`, data);
    },
    changePass: (data) => {
        return axios.post(`${apiURL}/email/change-password`, data)
    }
    // passwordReset: (_id, token, data) => {
    //     return axios.post(`${apiURL}/mail/${_id}/${token}`, data)
    // },
    // defineRoute: (data) => {
    //     return axios.post(`${apiURL}/mail/define-route`, data)
    // }
}

export default mailApi;