
import { useRoutes } from "react-router";
import LayoutDefault from "~/layout/admin/LayoutDefault/LayoutDefault";
import InfoCompany from "~/pages/admin/InfoComany/InfoCompany";

function AdminRoute() {
  let element = useRoutes([
   {
    path : '/admin',
    element : <LayoutDefault/>,
    children : [
      {
        path  : "info-company",
        element : <InfoCompany/>
      }
    ]
   }

  ]);
  return <>{element}</>;
}
export default AdminRoute;
