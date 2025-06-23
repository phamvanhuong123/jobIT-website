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
import VerifyCode from "~/pages/Register/VerifyCode";
import PriveRoutes from "~/components/PriveRoutes/PriveRoutes";
import ApplyForm from "~/pages/ApplyJob";
import LoginRecruiter from "~/pages/Login/LoginRecruiter";
import RegisterRecruiter from "../pages/Register/RegisterRecruiter";
import VerifyRecruiter from "~/pages/Register/VerifyRecruiter";
import CompanyReviewForm from "~/pages/Company/CompanyReviewForm/CompanyReviewForm";





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
          path: "company/:idCompany",
          element: <CompanyPage />,
        },
        {
          path: "review/:idCompany",
          element: <CompanyReviewForm />,
        },
        {
          path: "apply",
          element: <ApplyForm />,
        },
        {
          element: <PriveRoutes />,
          children: [
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
              path: "",
              element: <Overview />,
            },
          ],
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
              path: "",
              element: <Overview />,
            },
          ],
        },
        {
          path: "xac-nhan-xoa",
          element: <ConfirmDelete />,
        },
        {
          path: "dang-nhap",
          element: <Login />,
        },
        {
          path: "dang-ki",
          element: <Register />,
        },
        {
          path: "xac-thuc-email",
          element: <VerifyCode />,
        },
        {
          path: "xac-thuc-email-nha-tuyen-dung",
          element: <VerifyRecruiter />,
        },
        {
          path: "dang-nhap-nha-tuyen-dung",
          element: <LoginRecruiter />,
        },

        {
          path: "/dang-ky-nha-tuyen-dung",
          element: <RegisterRecruiter />,
        },


      ],
    },
  ]);
  return <>{element}</>;
}
export default ClientRoute;
