import { Button, Card, Col, Divider, Row } from "antd"
import './style.css'
import { DollarOutlined } from "@ant-design/icons"
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router"
function SeenJob(){
    return <>
         <Card style={{marginTop : 20}}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <Row gutter={[10,10]} justify={'space-between'} className="saved-job-box">
                        <Col className="seen__job__box__left">
                            <div className="seen__job__box__left__image">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="" />
                            </div>
                            <div className="seen__job__box__left__image__title">
                                <p className="seen__job__box__left__image__title__name-job">Senior DevOps Engineer (Cloud, AWS)</p>
                                <Link to={''} className="seen__job__box__left__image__title__name-company">TymeX</Link>
                                <p className="seen__job__box__left__image__title__location">Thành phố Hồ Chí Minh - Linh Hoạt</p>
                                <p className="seen__job__box__left__image__title__salary"><DollarOutlined/> 2000-4000</p>
                            </div>
                        </Col>
                        <Col className="seen__job__box__right">
                            <p className="seen__job__box__right__posted">Đăng 6 giờ trước</p>
                            <p className="seen__job__box__right__expired">(Hết hạn trong 28 ngày)</p>
                            <div className="seen__job__box__right__content">
                                <Link to={'/apply'}><Button type='primary' danger>Ứng tuyển</Button></Link>
                                <FaHeart fontSize={26} color="red" className="seen__job__box__right__icon"/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Divider/>
                <Col span={24}>
                    <Row gutter={[10,10]} justify={'space-between'} className="saved-job-box">
                        <Col className="seen__job__box__left">
                            <div className="seen__job__box__left__image">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="" />
                            </div>
                            <div className="seen__job__box__left__image__title">
                                <p className="seen__job__box__left__image__title__name-job">Senior DevOps Engineer (Cloud, AWS)</p>
                                <Link to={''} className="seen__job__box__left__image__title__name-company">TymeX</Link>
                                <p className="seen__job__box__left__image__title__location">Thành phố Hồ Chí Minh - Linh Hoạt</p>
                                <p className="seen__job__box__left__image__title__salary"><DollarOutlined/> 2000-4000</p>
                            </div>
                        </Col>
                        <Col className="seen__job__box__right">
                            <p className="seen__job__box__right__posted">Đăng 6 giờ trước</p>
                            <p className="seen__job__box__right__expired">(Hết hạn trong 28 ngày)</p>
                            <div className="seen__job__box__right__content">
                                <Link to={'/apply'}><Button type='primary' danger>Ứng tuyển</Button></Link>
                                <CiHeart fontSize={26} color="red" className="seen__job__box__right__icon"/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    </>
}
export default SeenJob