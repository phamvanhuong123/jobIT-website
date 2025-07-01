import { ICandidate } from "~/types/candidate";
import axios from "./axios.customize";
const token = localStorage.getItem('token');
export const getDetailCandidate = (idAccount : String) =>{
    console.log(token)
        return axios.get<IDataResponse<ICandidate>>(`candidates/${idAccount}`,{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })   
}
export const updateCandidate = (idAccount :String, body : any) =>{
  return axios.post(`candidates/update/${idAccount}`,body,{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })
}