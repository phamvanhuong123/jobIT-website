
import { useRoutes } from "react-router";
import LayoutDefault from "~/layout/admin/LayoutDefault/LayoutDefault";
import InfoCompany from "~/pages/admin/InfoComany/InfoCompany";
import ListCv from "~/pages/admin/ListCv/ListCv";
import CreateJobPage from "~/pages/admin/ListJobs/CreateJobPage/CreateJobPage";
import DetailJobPage from "~/pages/admin/ListJobs/DetailJobPage/DetailJobPage";
import ListJobs from "~/pages/admin/ListJobs/ListJobs";

function AdminRoute() {
  let element = useRoutes([
   {
    path : '/admin',
    element : <LayoutDefault/>,
    children : [
      {
        path  : "info-company",
        element : <InfoCompany/>
      },{
        path : 'management-job',
        element : <ListJobs/>
      },
      {
        path : 'management-job/:id',
        element : <DetailJobPage/>
      },{
        path : "management-job/create",
        element : <CreateJobPage/>
      },
      {
        path : "management-cv",
        element : <ListCv/>
      }
    ]
   }

  ]);
  return <>{element}</>;
}
export default AdminRoute;
