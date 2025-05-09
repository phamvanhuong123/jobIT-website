import { Card, Col, Row, Typography,Tag, Divider, Badge } from "antd"
import './style.css'
const {Title} = Typography
function TopEmployers(){
    return <div className="container">
        <div className="inner-wrap">
            <Row >
                <Col span={24} style={{textAlign : 'center'}}>
                    <Title level={2}>Nhà tuyển dụng hàng đầu</Title>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={8}>
                    <Card className="employer__box">
                        <div className="employer__box__image">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="ss" />
                        </div>
                        <div className="employer__box__content">
                            <Title style={{textAlign : 'center'}} level={4}>Công ty ABC</Title>
                            <div className="employer__box__tag-skill">
                                <Tag >C++</Tag>
                                <Tag>Javascript</Tag>
                                <Tag>C#</Tag>
                                <Tag>Java</Tag>
                                <Tag>Database</Tag>
                                <Tag>PHP</Tag>
                            </div>
                        </div>
                        <div className="employer__box__footer">
                            <div className="employer__box__footer__address">
                                Hồ Chí Minh
                            </div>
                            <div className="">
                                <Badge style={{marginRight : 10}} status ='success'/>
                                <span>8 Việc Làm</span>

                            </div>
                        </div>
                        
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="employer__box">
                        <div className="employer__box__image">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="ss" />
                        </div>
                        <div className="employer__box__content">
                            <Title style={{textAlign : 'center'}} level={4}>Công ty ABC</Title>
                            <div className="employer__box__tag-skill">
                                <Tag >C++</Tag>
                                <Tag>Javascript</Tag>
                                <Tag>C#</Tag>
                                <Tag>Java</Tag>
                                <Tag>Database</Tag>
                                <Tag>PHP</Tag>
                            </div>
                        </div>
                        <div className="employer__box__footer">
                            <div className="employer__box__footer__address">
                                Hồ Chí Minh
                            </div>
                            <div className="">
                                <Badge style={{marginRight : 10}} status ='success'/>
                                <span>8 Việc Làm</span>

                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="employer__box">
                        <div className="employer__box__image">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="ss" />
                        </div>
                        <div className="employer__box__content">
                            <Title style={{textAlign : 'center'}} level={4}>Công ty ABC</Title>
                            <div className="employer__box__tag-skill">
                                <Tag >C++</Tag>
                                <Tag>Javascript</Tag>
                                <Tag>C#</Tag>
                                <Tag>Java</Tag>
                                <Tag>Database</Tag>
                                <Tag>PHP</Tag>
                            </div>
                        </div>
                        <div className="employer__box__footer">
                            <div className="employer__box__footer__address">
                                Hồ Chí Minh
                            </div>
                            <div className="">
                                <Badge style={{marginRight : 10}} status ='success'/>
                                <span>8 Việc Làm</span>

                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

        </div>
    </div>
}
export default TopEmployers