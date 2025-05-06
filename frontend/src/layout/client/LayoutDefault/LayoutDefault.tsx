import { Outlet } from "react-router"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import './style.css'
import Layout, { Content } from "antd/es/layout/layout"
const {} = Layout
function LayoutDefault(){
    return <>
        <Layout>
            <Header/>
            <Content >
                <Outlet/>
            </Content>
            <Footer/>
        </Layout>
    </>
}
export default LayoutDefault