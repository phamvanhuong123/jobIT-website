import axios from './axios.customize'


export const addCv = (idUser : String,idJob : String,body : ICv)=>{
    return axios.post<IDataResponse<any>>(`cv/add/${idUser}/${idJob}`,body);
}
export const getApplyCvByUser = (idUser : String) =>{
    return axios.get<IDataResponse<AppliedCv[]>>(`cv/list/${idUser}`)
}
export const getCvByJob = (idsJob : String) =>{
    return axios.get<IDataResponse<Applicant[]>>(`cv/list-cv/${idsJob}`)
}
export const updateCv = (id : String,body : any) =>{
    return axios.patch<IDataResponse<any>>(`cv/update/${id}`,body)
}