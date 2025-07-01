import axios from "./axios.customize";

export const registerRecruiter = (data: { email: string }) => {
    return axios.post("/api/register", data);
    };

export const registerUser = (data: { email: string }) => {
     return axios.post("/api/register", data); // giống recruiter nhưng dùng cho user
    };

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

export const register = (data : any)=>{
    return axios.post<IDataResponse<any>>("register",data);
}

export const registerOTP = (data: any) => {
  return axios.post<IDataResponse<any>>("/api/register-employee-otp", data);
};

export const login = (data : any) =>{
    return axios.post<IDataResponse<ILogin>>("login",data);
}

export const loginEmployee = (data : any) =>{
    return axios.post<IDataResponse<ILogin>>("login-employee",data);
}
export const verifitoken = () =>{
    const token = localStorage.getItem('token');
    return axios.get<IDataResponse<IResponseVerifyToken>>('auth/verify-token',{
        headers :  {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const loginRecruiter = (data: { email: string; password: string }) => {
  return axios.post<IDataResponse<ILogin>>("/api/login-recruiter", data);
};
