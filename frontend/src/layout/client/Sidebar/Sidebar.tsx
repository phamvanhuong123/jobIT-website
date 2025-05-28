import { MdDashboard } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { PiHandWavingBold } from "react-icons/pi";
import { ConfigProvider, Layout, Menu } from "antd"
import { NavLink } from "react-router";
import './style.css'
import { MailOutlined } from "@ant-design/icons";
const {Sider } = Layout;
function Sidebar(){
    const items  = [
        {
            key: 'sub1',
            icon: <MdDashboard />,
            label: <NavLink to={'tong-quan-ho-so'}>Tổng quan</NavLink>
        },
        {
            key: 'sub2',
            icon: <IoDocumentTextOutline />,
            label: <NavLink to={'quan-li-cv'}>Hồ sơ đính kèm</NavLink>
        },
           {
            key: 'sub3',
            icon: <FaRegUser />,
            label: <NavLink to={'ho-so-cv'}>Hồ sơ</NavLink>
        },
        {
            key: 'sub4',
            icon: <MailOutlined />,
            label: <NavLink  to={'viec-lam-cua-toi'}>Việc làm của tôi</NavLink>
        },
          {
            key: 'sub5',
            icon: <CiSettings />,
            label: <NavLink to={'cai-dat'}>Cài đặt</NavLink>
        },
        
    ]
    return <>
        <Sider className="box-sidebar" width={300}  theme='light'>
         
                <div className="box-sidebar-title">
                    <div>
                        <PiHandWavingBold color="red" />
                        <span>Xin chào</span>
                    </div>
                    <h3>Unt pham</h3>
                </div>
                <ConfigProvider
                    theme={{
                        components : {
                            Menu : {
                                iconSize : 22
                            }
                        }
                    }}
                >
                    <Menu items={items}/>
                </ConfigProvider>
                
         
        </Sider>
    </>
}
export default Sidebar;