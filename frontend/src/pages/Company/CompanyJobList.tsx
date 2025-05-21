import { Card, Typography, Space, Tag } from "antd";

const { Title, Text } = Typography;

type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    description: string[];
};

const jobList: Job[] = [
    {
        id: 1,
        title: "[Fresher/Experienced] Unity Game Developer",
        company: "NEXON DEV VINA",
        location: "TP Hồ Chí Minh",
        tags: ["Unity", "C#", "Games"],
        posted: "1 ngày trước",
        description: ["13th Month salary, work 5 days a week",
            "Annual Company Trip, Quarterly team building",
            "Premium health insurance, Annual Health check-up"],
    },
    {
        id: 2,
        title: "MMORPG Server Developer (Games/C++)",
        company: "NEXON DEV VINA",
        location: "TP Hồ Chí Minh",
        tags: ["Linux", "C++", "Games"],
        posted: "2 ngày trước",
        description: ["13th Month salary, work 5 days a week",
            "Annual Company Trip, Quarterly team building",
            "Premium health insurance, Annual Health check-up"],
    },
    {
        id: 3,
        title: " [Fresher/Experienced] C++ Game Developer",
        company: "NEXON DEV VINA",
        location: "TP Hồ Chí Minh",
        tags: ["C++", "Games", "Unity"],
        posted: "3 ngày trước",
        description: ["13th Month salary, work 5 days a week",
            "Annual Company Trip, Quarterly team building",
            "Premium health insurance, Annual Health check-up"],
    },
    {
        id: 4,
        title: "Web Developer (Games/ReactJS/Angular)",
        company: "NEXON DEV VINA",
        location: "TP Hồ Chí Minh",
        tags: ["Games", "Angular", "ReactJS"],
        posted: "4 ngày trước",
        description: ["13th Month salary, work 5 days a week",
            "Annual Company Trip, Quarterly team building",
            "Premium health insurance, Annual Health check-up"],
    },
    {
        id: 5,
        title: "AI Talents (Ph.D. Holders)",
        company: "NEXON DEV VINA",
        location: "TP Hồ Chí Minh",
        tags: ["Python", "AI", "Machine Learning"],
        posted: "1 tuần trước",
        description: ["13th Month salary, work 5 days a week",
            "Annual Company Trip, Quarterly team building",
            "Premium health insurance, Annual Health check-up"],
    },
    {
        id: 6,
        title: "Unity Game Developer - MINTROCKET",
        company: "NEXON DEV VINA",
        location: "TP Hồ Chí Minh",
        tags: ["Games", "Unity", "C#"],
        posted: "25 ngày trước",
        description: ["13th Month salary, work 5 days a week",
            "Annual Company Trip, Quarterly team building",
            "Premium health insurance, Annual Health check-up"],
    },
];

const JobList = ({ jobs }: { jobs: Job[] }) => (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {jobs.map((job) => (
            <Card key={job.id} hoverable>
                <Title level={5}>{job.title}</Title>
                <Text strong>{job.company}</Text> - <Text>{job.location}</Text>
                <div style={{ marginTop: 8 }}>
                    {job.tags.map((tag, idx) => (
                        <Tag key={idx} color="blue">
                            {tag}
                        </Tag>
                    ))}
                </div>
                <Text type="secondary">{job.posted}</Text>
                <ul>
                    {job.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </Card>
        ))}
    </Space>
);

function CompanyJobList() {
    return (
        <div className="company-job-container">
            <h2>việc làm đang tuyển dụng</h2>
            <div className="company-job-list">
                <JobList jobs={jobList} />
            </div>
        </div>
    );
}

export default CompanyJobList;
