import { ICandidate } from "~/types/candidate";
import axios from "./axios.customize";

export const getDetailCandidate = (idAccount : String) =>{
        return axios.get<IDataResponse<ICandidate>>(`candidates/${idAccount}`)   
}
export const updateCandidate = (idAccount :String, body : any) =>{
  return axios.post(`candidates/update/${idAccount}`,body)
}