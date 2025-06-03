import { useRoutes } from "react-router";
import LayoutDefault from "~/layout/client/LayoutDefault/LayoutDefault";
import DetailJob from "~/pages/DetailJob/DetailJob";
import Home from "~/pages/Home/Home";
import ListJobs from "~/pages/ListJobs/ListJobs";
import CompanyPage from "~/pages/Company/Company";
import Settings from "~/pages/Account/Settings/Settings";
import MyJobs from "~/pages/Account/MyJobs/MyJobs";
import Profile from "~/pages/Account/Profile/Profile";
import AttachedCV from "~/pages/Account/AttachedCV/AttachedCV";
import Overview from "~/pages/Account/Overview/Overview";
import Account from "~/pages/Account/Account";
import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/Register";
import ConfirmDelete from "~/pages/Account/Settings/ConfirmDelete";


function ClientRoute() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "viec-lam-it",
          element: <ListJobs />,
        },
        {
          path: "viec-lam-it/chi-tiet",
          element: <DetailJob />,
        },
        {
          path: "company",
          element: <CompanyPage />,
        },
        {
          path: "user",
          element: <Account />,
          children: [
            { 
              path: "tong-quan-ho-so",
              element: <Overview />,
              
            },
            {
              path: "quan-li-cv",
              element: <AttachedCV />,
            },
            {
              path: "ho-so-cv",
              element: <Profile />,
            },
            {
              path: "viec-lam-cua-toi",
              element: <MyJobs />,
            },
            {
              path: "cai-dat",
              element: <Settings />,
            },
            {
              path : '',
              element: <Overview />,
              
            },
          ],
        },
         {
              path: "xac-nhan-xoa",
              element: <ConfirmDelete />
            },
        {
      path: "dang-nhap",
      element: <Login />,
    },

    {
      path: "dang-ki",
      element: <Register />,
    },
      ],
    },
    
  ]);
  return <>{element}</>;
}
export default ClientRoute;
