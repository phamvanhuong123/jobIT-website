// import { Space } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import "./style.css";
// import ALlJobs from './AllJobs/AllJobs';
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/store";

import { fetchCandidateById } from "~/features/candidate.slice";
import { verifitoken } from "~/services/account.axios";
import { useEffect } from "react";
import { Avatar, Button } from "antd";
import { logOut } from "~/features/candidate.slice"
function Header() {
  const candidate = useAppSelector((state) => state.candidateReducer.candidate);
  const dispatch = useAppDispatch();
const navigate = useNavigate();
 const handleLogout = (url : string) =>{
   
    localStorage.removeItem('token');
    dispatch(logOut());
    navigate(url)
}
  
  
  useEffect(() => {
    // Xác thực token
    if (!candidate) {
      const fetchApiVerifyToken = async () => {
          const response = await verifitoken();
          if (response.data) {
            dispatch(fetchCandidateById(response.data?.idAccount));
          }
       
      };
      fetchApiVerifyToken();
    }
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <Link to="/">
              Job<span>IT</span>
            </Link>
          </div>
          {/* <div className='header__menu'>
                        <Space className='header__menu__item'>
                            <p className='header__menu__item__title'>Viec làm IT</p>
                            <DownOutlined />
                            <ALlJobs/>
                        </Space>
                </div> */}
        </div>
        <div className="header__right">
          <ul className="header__right__menu">
            <Link to={""}>Nhà tuyển dụng</Link>
            {candidate ? (
              <div>
                <Button type="text" style={{ color: "white" }}>
                <Avatar style={{ backgroundColor: "orange", color: "white" }}>
                  {candidate.fullName.at(0)}
                </Avatar>{" "}
                {candidate.fullName}{" "}
              </Button>
              <Button type="text" style={{ color: "white" }} onClick={()=>{handleLogout('/dang-nhap')}}>
                Đăng xuất
              </Button>
              </div>
            ) : (
              <Link to={"/dang-nhap"}>Đăng nhập/Đăng kí</Link>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
