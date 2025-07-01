
import {  Outlet, useNavigate } from 'react-router';
import {verifitoken} from '~/services/account.axios'

function PriveRoutes() {
    const navigate = useNavigate();
    const checkLogin  = async ()=>{
       try{
         const resData = await verifitoken();
        if (resData.status !== 200)
        console.log(resData)
       }
       catch{
            navigate('/dang-nhap')

       }
    }
    checkLogin()
    console.log("áds")
    return <Outlet/>
}

export default PriveRoutes