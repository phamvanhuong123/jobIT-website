import axios from './axios.customize'
interface ICompany{
    _id : String;
    name : String
}
export const getAllCompany = ()=>{
    return axios.get<IDataResponse<ICompany[]>>("companies");
}