import AdminRoute from "./AdminRoutes";
import ClientRoute from "./ClientRoute";

function AllRoutes(){
    return <>
        <ClientRoute/>
        <AdminRoute/>
    </>
}
export default AllRoutes