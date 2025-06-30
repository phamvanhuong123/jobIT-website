
import axios from './axios.customize'


export const getAllJob = (query:String = "")=>{
    return axios.get<IDataResponse<IJob[]>>(`jobs${query}`);
}
export const getAllJobByCompany = (idCompany : String)=>{
    return axios.get<IDataResponse<IJob[]>>(`jobs/${idCompany}`)
}
export const detailJob = (id : String)=>{
    return axios.get<IDataResponse<IJob>>(`jobs/detail/${id}`);
}
export const updateJobById = (id: string, body: any) =>{
    return axios.patch<IDataResponse<any>>(`jobs/update/${id}`,body)
}