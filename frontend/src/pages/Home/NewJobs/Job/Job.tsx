import { Badge, Card, Divider, Tag, Typography } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { LuMapPinCheckInside } from "react-icons/lu";
import { RiHomeOfficeLine } from "react-icons/ri";
const { Title } = Typography;
function Job(){
    return <>
    
    <Badge.Ribbon text="New for you">
              <Card className="card__job">
                <div className="card__job__header">
                  <p className="card__job__header__text">Đăng 1 giờ trước</p>
                  <Title level={4}>Fullstack (Java, Kotlin)</Title>
                </div>
                <div className="card__job__content">
                    <div className="card__job__content__img">
                        <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="" />
                        <div className="card__job__content__name">Công ty ABC</div>
                    </div>
                    <div className="card__job__content__salary">
                        <FaDollarSign/>
                        <p>500 - 800 USD</p>        
                    </div>
                </div>
                <Divider  style={{ borderColor: 'rgb(203 201 255)' }}/>
                <div className="card__job__footer">
                    <div className="card__job__footer__workplace">
                        <RiHomeOfficeLine />
                        <p>Tại văn phòng</p>
                    </div>
                    <div className="card__job__footer__address">
                        <LuMapPinCheckInside />
                        <p>Hồ Chí Minh </p>
                    </div>
                    <div className="card__job__footer__skills">
                        <Tag color='processing'>Java</Tag>
                        <Tag color='processing'>ReactJS</Tag>
                    </div>
                </div>
              </Card>
            </Badge.Ribbon>
    </>
}
export default Job