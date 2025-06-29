import axios from './axios.customize'


export const addCv = (idUser : String,idJob : String,body : ICv)=>{
    return axios.post<IDataResponse<any>>(`http://localhost:5000/api/cv/add/${idUser}/${idJob}`,body);
}
