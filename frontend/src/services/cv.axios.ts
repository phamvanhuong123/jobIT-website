import axios from './axios.customize'


export const addCv = (idUser : String,idJob : String,body : ICv)=>{
    return axios.post<IDataResponse<any>>(`cv/add/${idUser}/${idJob}`,body);
}
export const getApplyCvByUser = (idUser : String) =>{
    return axios.get<IDataResponse<AppliedCv[]>>(`cv/list/${idUser}`)
}