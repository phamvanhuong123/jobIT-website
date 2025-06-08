import { Button, Card, Divider, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    description: string;
}

function JobIT({ job }: { job: Job }) {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate("/apply", { state: { job } });
    };

    const descriptionText = (job.description ?? "").repeat(10);

    return (
        <div className="detail-column">
            <div className="detail-card-scroll">
                <Card title={job.title}>
                    <Text strong>{job.company}</Text>
                    <Divider />
                    <p><strong>Địa điểm:</strong> {job.location}</p>
                    <p><strong>Đăng:</strong> {job.posted}</p>
                    <p><strong>Mô tả:</strong><br />{descriptionText}</p>
                    <div style={{ marginTop: 12 }}>
                        {(job.tags ?? []).map((tag, idx) => (
                            <Tag key={idx} color="blue">{tag}</Tag>
                        ))}
                    </div>
                    <Button type="primary" style={{ marginTop: 16 }} onClick={handleApplyClick}>
                        Ứng tuyển
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default JobIT;
