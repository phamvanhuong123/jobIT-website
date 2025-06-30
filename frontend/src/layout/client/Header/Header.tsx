// import { Space } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import "./style.css";
// import ALlJobs from './AllJobs/AllJobs';
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/store";
import { BellOutlined, FileDoneOutlined } from "@ant-design/icons";
import { fetchCandidateById } from "~/features/candidate.slice";
import { verifitoken } from "~/services/account.axios";
import { useEffect, useState } from "react";
import { Avatar, Badge, Button, Modal } from "antd";
import { logOut } from "~/features/candidate.slice";
function Header() {
  const candidate = useAppSelector((state) => state.userCandidate.candidate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationCount] = useState(0);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = (url: string) => {
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate(url);
  };

  useEffect(() => {
    // Xác thực token
    if (!candidate) {
      const fetchApiVerifyToken = async () => {

        const response = await verifitoken();
        console.log(response.message);
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
          <Link to="/viec-lam-it">
            <p style={{ marginRight: 10, fontSize: 16 }}>Việc làm IT</p>
          </Link>
        </div>

        <div className="header__right">
          <ul className="header__right__menu">


            {/* Thông báo */}
            <div className="notification-bell" onClick={showModal}>
              <Badge count={notificationCount > 0 ? notificationCount : 0} offset={[0, 5]} showZero={false}>
                <BellOutlined style={{ fontSize: 22, color: "white" }} />
              </Badge>
            </div>


            {/* Modal Thông báo */}
            <Modal
              title="Thông báo"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              centered
            >
              <div style={{ textAlign: "center" }}>
                <FileDoneOutlined style={{ fontSize: 64, color: "#fa541c", marginBottom: 10 }} />
                <h3 style={{ margin: 0 }}>Tìm việc thụ động</h3>
                <p>Nhận lời mời công việc trên ITviec khi chỉ cần tải CV lên</p>
                <Button type="primary" ghost>
                  Tìm hiểu thêm
                </Button>
              </div>
            </Modal>

            {/* Nhà tuyển dụng */}
            <Link to="/dang-nhap-nha-tuyen-dung" className="recruiter-link">
              Nhà tuyển dụng
            </Link>
            {candidate ? (
              <div>
                <Button type="text" style={{ color: "white" }}>
                  <Avatar style={{ backgroundColor: "orange", color: "white" }}>
                    {candidate.fullName.at(0)}
                  </Avatar>
                  <Link to={"/user"}>{candidate.fullName}</Link>
                </Button>
                <Button
                  type="text"
                  style={{ color: "white" }}
                  onClick={() => {
                    handleLogout("/dang-nhap");
                  }}
                >
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
