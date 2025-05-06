import { Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './style.css'
import ALlJobs from './AllJobs/AllJobs';

  
function Header(){

    return<>
        <header className='header'>
            <div className='header__left'>
            <div className='header__logo'>
                <div>JobIT</div>
            </div>
            <div className='header__menu'>
                    <Space className='header__menu__item'>
                        <p className='header__menu__item__title'>Viec làm IT</p>
                        <DownOutlined />
                        <ALlJobs/>
                    </Space>
                    
                
            </div>
            </div>
        </header>
    </>
}

export default Header