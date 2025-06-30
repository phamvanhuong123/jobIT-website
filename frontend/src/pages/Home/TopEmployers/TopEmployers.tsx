import { Card, Col, Row, Typography, Tag, Badge } from "antd";
import './style.css';
import { useEffect, useState } from "react";
import { getAllCompany } from "../../../services/company.axios";
import { getAllJobByCompany } from "../../../services/job.axios"; // Đường dẫn tuỳ vào project
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function TopEmployers() {
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [jobCount, setJobCount] = useState<Record<string, number>>({}); // lưu số job theo companyId
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllCompany();
            if (res?.data) {
                const selectedCompanies = res.data.slice(0, 6);
                setCompanies(selectedCompanies);

                // Gọi API lấy job theo từng công ty
                const jobCountMap: Record<string, number> = {};
                await Promise.all(
                    selectedCompanies.map(async (company) => {
                        try {
                            const jobRes = await getAllJobByCompany(company._id);
                            jobCountMap[company._id as string] = jobRes?.data?.length || 0;
                        } catch (error) {
                            jobCountMap[company._id as string] = 0;
                        }
                    })
                );

                setJobCount(jobCountMap);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="inner-wrap">
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Title level={2}>Nhà tuyển dụng hàng đầu</Title>
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    {companies.map((company) => (
                        <Col span={8} key={company._id.toString()}>
                            <Card className="employer__box"
                                onClick={() => navigate(`/company/${company._id}`)}
                                hoverable
                                style={{ cursor: 'pointer' }}>
                                <div className="employer__box__image" >
                                    {/* Logo giữ nguyên tĩnh */}
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s" alt="ss" />
                                </div>
                                <div className="employer__box__content">
                                    <Title style={{ textAlign: 'center' }} level={4}>{company.name}</Title>
                                    <div className="employer__box__tag-skill">
                                        {(company.keySkills || []).slice(0, 6).map(skill => (
                                            <Tag key={skill}>{skill}</Tag>
                                        ))}
                                    </div>
                                </div>
                                <div className="employer__box__footer">
                                    <div className="employer__box__footer__address">
                                        {company.address}
                                    </div>
                                    <div>
                                        <Badge style={{ marginRight: 10 }} status='success' />
                                        <span>{jobCount[company._id as string] || 0} Việc Làm</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default TopEmployers;
