import { useLocation } from "react-router-dom";
import AdminRoute from "./AdminRoutes";
import ClientRoute from "./ClientRoute";

function AllRoutes() {
    const { pathname } = useLocation();

    if (pathname.startsWith("/admin")) {
        return <AdminRoute />;
    }

    return <ClientRoute />;
}

export default AllRoutes;
