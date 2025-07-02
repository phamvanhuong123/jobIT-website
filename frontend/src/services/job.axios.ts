
import axios from './axios.customize'
const token = localStorage.getItem('token');

export const getAllJob = (query?: string | null) => {
    const url = query ? `/jobs${query}` : "/jobs";
    return axios.get<IDataResponse<IJob[]>>(url);
};

export const getAllJobByCompany = (idCompany: String) => {
    return axios.get<IDataResponse<IJob[]>>(`jobs/${idCompany}`)
}
export const detailJob = (id: String) => {
    return axios.get<IDataResponse<IJob>>(`jobs/detail/${id}`);
}
export const updateJobById = (id: string, body: any) => {
    return axios.patch<IDataResponse<any>>(`jobs/update/${id}`, body,{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const createJobById = (id: string, body: any) => {
    return axios.post<IDataResponse<IJob>>(`jobs/create/${id}`, body,{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const deleteJob = (id :string) =>{
    return axios.delete<IDataResponse<any>>(`jobs/delete/${id}`,{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    });
}