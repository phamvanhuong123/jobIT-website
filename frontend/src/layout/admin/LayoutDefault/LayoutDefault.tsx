import { useEffect, useState } from "react";
import "./style.css";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import MenuSider from "./MenuSider";
import { Link, Outlet, useNavigate } from "react-router";
import { verifitoken } from "~/services/account.axios";

const { Sider, Content } = Layout;
function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isLogin,setIsLogin] = useState(false)
  useEffect(() => {
    const fetchApiVerifyToken = async () => {
      try {
        const response = await verifitoken();
        console.log();
        if (response.data?.role !== "employee") {
          navigate("/");
        }
        else{
          setIsLogin(true)
        }
      } catch (e) {
        console.log(e);
        navigate("/dang-nhap-nha-tuyen-dung");
      }
    };
    fetchApiVerifyToken();
  }, []);
  
  if (!isLogin) return null

  return (
    <>
      <Layout className="layout-default-admin">
        <header className="header-admin">
          <div
            className={"header-admin__left" + (collapsed ? "--collapsed" : "")}
          >
            <p className="header-admin__title">
              {!collapsed ? "IT Admin" : "IT"}
            </p>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 40,
                height: 40,
              }}
            />
          </div>
          <div className="header-admin__right">
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                console.log("ok");
              }}
              to={"/dang-nhap-nha-tuyen-dung"}
            >
              <Button type="text" icon={<LogoutOutlined />}>
                Đăng xuất
              </Button>
            </Link>
          </div>
        </header>

        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <MenuSider />
          </Sider>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutDefault;
