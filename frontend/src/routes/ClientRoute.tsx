import { useRoutes } from "react-router"
import LayoutDefault from "~/layout/client/LayoutDefault/LayoutDefault"
import DetailJob from "~/pages/DetailJob/DetailJob"
import Home from "~/pages/Home/Home"
import ListJobs from "~/pages/ListJobs/ListJobs"
import CompanyPage from '~/pages/Company/Company';
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function ClientRoute() {
    let element = useRoutes([
        {
            path: '/',
            element: <LayoutDefault />,
            children: [{
                path: '',
                element: <Home />
            },
            {
                path: 'viec-lam-it',
                element: <ListJobs />
            },
            {
                path: 'viec-lam-it/chi-tiet',
                element: <DetailJob />
            },
            {
                path: "company",
                element: <CompanyPage />
            }
            
            ]
             },
             {
                path: 'dang-nhap', 
                element: <Login />
             }, 

             {
                path: 'dang-ki', 
                element: <Register/>
             }



       
    ])
    return <>
        {element}
    </>
}
export default ClientRoute