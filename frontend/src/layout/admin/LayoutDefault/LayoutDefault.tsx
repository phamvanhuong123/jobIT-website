import { useState } from "react";
import "./style.css";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import MenuSider from "./MenuSider";
import { Link, Outlet } from "react-router";

const { Sider, Content } = Layout;
function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
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
            <Link to={''}>
            <Button type="text"  icon={<LogoutOutlined />}>
              Đăng xuất
            </Button></Link>
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
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutDefault;
