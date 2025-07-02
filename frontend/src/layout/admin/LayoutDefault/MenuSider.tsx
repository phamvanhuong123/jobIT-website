import { DashboardOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons"
import { SiReaddotcv } from "react-icons/si";
import { Menu } from "antd"
import { Link } from "react-router"

function MenuSider(){
    return <>
    <Menu 
              defaultSelectedKeys={["2"]}
              items={[
                
                {
                  key: "2",
                  icon: <UserOutlined />,
                  label: <Link to={'/admin/info-company'}>Thông tin công ty</Link>,
                },
                {
                  key: "3",
                  icon: <MenuOutlined />,
                  label: <Link to={"/admin/management-job"}>Quản lí việc làm</Link>,
                },
                {
                    key: "4",
                  icon: <SiReaddotcv />,
                  label: <Link to={"/admin/management-cv"}>Quản lí CV</Link>,
                }
              ]}
            />
    </>
}
export default MenuSider