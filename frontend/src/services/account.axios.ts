import axios from "./axios.customize";

interface ILogin  {
    user : {
        _id: String,
        name: String,
        idAccount: String,
        createdAt: Date,
        updatedAt: Date,

    }
    token : string
    
}

interface IResponseVerifyToken{
    idAccount : String,
    role : String
}

export  const register = (data : any)=>{
    return axios.post<IDataResponse<any>>("register",data);
}

export const login = (data : any) =>{
    return axios.post<IDataResponse<ILogin>>("login",data);
}
export const verifitoken = () =>{
    const token = localStorage.getItem('token');
    return axios.get<IDataResponse<IResponseVerifyToken>>('auth/verify-token',{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })
}