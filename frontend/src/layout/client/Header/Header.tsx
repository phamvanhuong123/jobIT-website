import { Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './style.css'
import ALlJobs from './AllJobs/AllJobs';
import { Link } from 'react-router';

  
function Header(){

    return<>
        <header className='header'>
            <div className='header__left'>
                <div className='header__logo'>
                    <Link to="/">Job<span>IT</span></Link>
                </div>
                <div className='header__menu'>
                        <Space className='header__menu__item'>
                            <p className='header__menu__item__title'>Viec làm IT</p>
                            <DownOutlined />
                            <ALlJobs/>
                        </Space>
                </div>
            </div>
            <div className='header__right'>
                <ul className='header__right__menu'>
                    <Link to={''}>
                        Nhà tuyển dụng
                    </Link>
                    <Link to={'/dang-nhap'}>
                        Đăng nhập/Đăng kí
                    </Link>
                </ul>
            </div>
        </header>
    </>
}

export default Header