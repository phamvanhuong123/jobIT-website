import { useRoutes } from "react-router";
import LayoutDefault from "~/layout/client/LayoutDefault/LayoutDefault";
import DetailJob from "~/pages/DetailJob/DetailJob";
import Home from "~/pages/Home/Home";
import ListJobs from "~/pages/ListJobs/ListJobs";
import CompanyPage from "~/pages/Company/Company";

import Account from "~/pages/Account/Account";
import Overview from "~/pages/Account/Overview/Overview";
import AttachedCV from "~/pages/Account/AttachedCV/AttachedCV";
import Profile from "~/pages/Account/Profile/Profile";
import MyJobs from "~/pages/Account/MyJobs/MyJobs";
import Settings from "~/pages/Account/Settings/Settings";
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
            path : 'user',
            element : <Account/>,
            children : [
              {
                path  :'tong-quan-ho-so',
                element : <Overview/>
              },
              {
                path  :'quan-li-cv',
                element : <AttachedCV/>
              },
              {
                path  :'ho-so-cv',
                element : <Profile/>
              },
              {
                path  :'viec-lam-cua-toi',
                element : <MyJobs/>
              },
              {
                path  :'cai-dat',
                element : <Settings/>
              },
            ]
        }
      ],
    },
  ]);
  return <>{element}</>;
}
export default ClientRoute;
