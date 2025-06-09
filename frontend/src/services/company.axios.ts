
import axios from './axios.customize'

export const getAllCompany = ()=>{
    return axios.get<IDataResponse<ICompany[]>>("companies");
}