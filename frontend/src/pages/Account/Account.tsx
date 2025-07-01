import { Layout } from "antd"
import { useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "~/layout/client/Sidebar/Sidebar";

const {Content} = Layout
const style : React.CSSProperties = {
    padding : '20px 0',
    gap : 25,
    margin : '0 auto',
    maxWidth : 1200,
    width : '100%',
   

}
function Account(){
    return<>
    <Layout style={style} >
           
            <Sidebar/>
            <Content >
                <Outlet/>
            </Content>
        </Layout>
    </>
}
export default Account;