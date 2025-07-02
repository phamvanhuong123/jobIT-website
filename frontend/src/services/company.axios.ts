
import axios from './axios.customize'
const token = localStorage.getItem('token');

export const getAllCompany = ()=>{
    return axios.get<IDataResponse<ICompany[]>>("companies");
}
export const detailCompany = (id : String) =>{
    return axios.get<IDataResponse<ICompany>>(`companies/${id}`);
}
export const updateCompany = (id? : String,body? : ICompany) =>{
    return axios.patch<IDataResponse<any>>(`companies/update/${id}`,body,{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })
}