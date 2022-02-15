import axios from 'axios'
import { apiURL } from '../urlCovid';

const CovidApi = {
    getVietNam: () => {
        return axios.get(`${apiURL}/v3/covid-19/countries`)
    }
}
export default CovidApi;