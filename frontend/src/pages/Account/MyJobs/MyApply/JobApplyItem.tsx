import { DollarOutlined } from "@ant-design/icons";
import {  Col, Row, Tag } from "antd";
import dayjs from "dayjs";

import { Link } from "react-router";
import timeAgo from "~/pages/utils/timeAgo";

function JobApplyItem({item} : {item : AppliedCv}){

    return <Row gutter={[10,10]} justify={'space-between'} className="saved-job-box">
                        <Col className="saved__job__box__left">
                            <div className="saved__job__box__left__image">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="" />
                            </div>
                            <div className="saved__job__box__left__image__title">
                                <p className="saved__job__box__left__image__title__name-job">{item.jobName}</p>
                                <Link to={''} className="saved__job__box__left__image__title__name-company">{item.companyName}</Link>
                                <p className="saved__job__box__left__image__title__location">{item.locations}</p>
                                <p className="saved__job__box__left__image__title__salary"><DollarOutlined/> {`${item.jobSalary.min} -${item.jobSalary.max} `}</p>
                            </div>
                        </Col>
                        <Col className="saved__job__box__right">
                            <p className="saved__job__box__right__posted">{timeAgo(dayjs(item.createdAt).format("DD/MM/YYYY"))}</p>
                            <div className="saved__job__box__right__content">
                                       <strong >Trạng thái:</strong>
                                        <Tag color="blue" style={{marginLeft : 10}}>{item.status.toUpperCase()}</Tag>
                            </div>
                        </Col>
                    </Row>
}
export default JobApplyItem