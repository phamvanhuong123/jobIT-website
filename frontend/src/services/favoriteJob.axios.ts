import axios from "./axios.customize";


export const getAllFavoriteJobByCandidate = (idCandidate : String) =>{
    return axios.get<IDataResponse<any[]>>(`favorite-jobs/${idCandidate}`)
}
export const addFavoriteJob = (body :any) =>{
    return axios.post<IDataResponse<any>>('favorite-jobs/add',body)
}
export const deleteFavoriteJob = (id : String) =>{
    return axios.delete<IDataResponse<any>>(`favorite-jobs/delete/${id}`)
}