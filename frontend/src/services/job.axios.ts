
import axios from './axios.customize'


export const getAllJob = ()=>{
    return axios.get<IDataResponse<IJob[]>>('jobs');
}