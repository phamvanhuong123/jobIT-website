
import {  Outlet, useNavigate } from 'react-router';
import {verifitoken} from '~/services/account.axios'

function PriveRoutes() {
    const navigate = useNavigate();
    const checkLogin  = async ()=>{
        const resData = await verifitoken();
        if (resData.status !== 200)
            navigate('/dang-nhap')
        console.log(resData)
    }
    checkLogin()
    return <Outlet/>
}

export default PriveRoutes