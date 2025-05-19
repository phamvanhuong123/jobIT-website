import { Button, Card, Divider,Tag,Typography } from "antd";
const {Text} = Typography
interface Job  {
    id: number;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    description: string;
};
function JobIT({job} : {job: Job}) {
    return <>
     <div className="detail-column">
        <div className="detail-card-scroll">
            <Card title={job.title} >
                <Text strong>{job.company}</Text>
                <Divider />
                <p><strong>Địa điểm:</strong> {job.location}</p>
                <p><strong>Đăng:</strong> {job.posted}</p>
                <p><strong>Mô tả:</strong><br />{job.description.repeat(10)}</p>
                <div style={{ marginTop: 12 }}>
                    {job.tags.map((tag, idx) => (
                        <Tag key={idx} color="blue">{tag}</Tag>
                    ))}
                </div>
                <Button type="primary" style={{ marginTop: 16 }}>Ứng tuyển</Button>
            </Card>
        </div>
    </div>
    </>
}
export default JobIT