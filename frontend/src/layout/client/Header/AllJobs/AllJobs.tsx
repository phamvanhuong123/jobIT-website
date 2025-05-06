
import { ArrowRightOutlined } from '@ant-design/icons'
import './style.css'

function ALlJobs(){
    return <>
        <ul className='all-jobs'>
            <li className='all-jobs__item'>
                <div  className='all-jobs__item__content'>
                    <p>Việc làm theo kĩ năng</p>
                    <ArrowRightOutlined />
                </div>
                <ul className='all-jobs__item__sub-item'>
                    <li>C++</li>
                    <li>Java</li>
                    <li>Python</li>
                    <li>C#</li>
                </ul>

            </li>
            <li className='all-jobs__item'>
                <div  className='all-jobs__item__content'>
                    <p>Việc làm theo công ty</p>
                    <ArrowRightOutlined />
                </div>
                <ul className='all-jobs__item__sub-item'>
                    <li>FPT</li>
                    <li>TMA</li>
                    <li>NCC</li>
                </ul>
            </li>
            <li className='all-jobs__item'>
                <div className='all-jobs__item__content'>
                    <p>Việc làm theo Trình độ</p>
                    <ArrowRightOutlined />
                </div>
                <ul className='all-jobs__item__sub-item'>
                    <li>Inter</li>
                    <li>Fresher</li>
                    <li>Junior</li>
                </ul>

            </li>
        </ul>
    </>
}
export default ALlJobs