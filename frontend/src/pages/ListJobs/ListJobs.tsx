import {
    Row,
    Col,
    Card,
    Typography,
    Divider,
    Space,
    Tag,
    Button,
    Dropdown,
    Checkbox,
} from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import SearchBox from "~/components/SearchBox/SearchBox";
import "./ListJobs.css";

const { Title, Text } = Typography;

type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    description: string;
};

const jobList: Job[] = [
    {
        id: 1,
        title: "Project Manager",
        company: "NAL Viet Nam",
        location: "Da Nang",
        tags: ["Agile", "Scrum", "Management"],
        posted: "1 ngày trước",
        description: "Quản lý dự án phần mềm, phối hợp các team phát triển.",
    },
    {
        id: 2,
        title: "Fullstack Developer",
        company: "FPT Software",
        location: "Ha Noi",
        tags: ["React", "Node.js", "JavaScript"],
        posted: "2 ngày trước",
        description: "Phát triển hệ thống web bằng React và Node.js.",
    },
    {
        id: 3,
        title: "Backend Developer",
        company: "VNPT Technology",
        location: "Hồ Chí Minh",
        tags: ["Java", "Spring Boot", "MySQL"],
        posted: "3 ngày trước",
        description: "Thiết kế và phát triển API backend sử dụng Java và Spring Boot.",
    },
    {
        id: 4,
        title: "Mobile Developer",
        company: "CMC Global",
        location: "Da Nang",
        tags: ["Flutter", "Dart", "Android"],
        posted: "4 ngày trước",
        description: "Phát triển ứng dụng di động đa nền tảng bằng Flutter.",
    },
    {
        id: 5,
        title: "AI Engineer",
        company: "VNG Corporation",
        location: "Hồ Chí Minh",
        tags: ["Python", "TensorFlow", "Machine Learning"],
        posted: "1 tuần trước",
        description: "Phân tích dữ liệu và xây dựng mô hình học máy cho các dự án AI.",
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "TMA Solutions",
        location: "Ha Noi",
        tags: ["AWS", "Docker", "CI/CD"],
        posted: "5 ngày trước",
        description: "Triển khai và duy trì hệ thống CI/CD, quản lý hạ tầng trên AWS.",
    },
    {
        id: 7,
        title: "UI/UX Designer",
        company: "Axon Active",
        location: "Da Nang",
        tags: ["Figma", "Design Thinking", "Wireframe"],
        posted: "2 tuần trước",
        description: "Thiết kế giao diện người dùng và cải thiện trải nghiệm người dùng.",
    }

];

const FilterDropdown = ({
    label,
    options,
    selected,
    onChange,
}: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (val: string[]) => void;
}) => (
    <Dropdown
        trigger={["click"]}
        overlay={
            <div style={{ padding: 10, background: "#fff", borderRadius: 8 }}>
                <Checkbox.Group
                    value={selected}
                    onChange={onChange}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    {options.map((opt) => (
                        <Checkbox key={opt} value={opt}>
                            {opt}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </div>
        }
    >
        <Button>
            {label} <DownOutlined />
        </Button>
    </Dropdown>
);
// COMPONENT CON: DANH SÁCH JOB
const JobList = ({ jobs, selectedId, onSelect }: {
    jobs: Job[];
    selectedId: number | null;
    onSelect: (job: Job) => void;
}) => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {jobs.map((job) => (
            <Card
                key={job.id}
                hoverable
                onClick={() => onSelect(job)}
                className={`job-card ${selectedId === job.id ? 'selected' : ''}`}
            >
                <Title level={5}>{job.title}</Title>
                <Text strong>{job.company}</Text> - <Text>{job.location}</Text>
                <div style={{ marginTop: 8 }}>
                    {job.tags.map((tag, idx) => (
                        <Tag key={idx} color="blue">{tag}</Tag>
                    ))}
                </div>
                <Text type="secondary">{job.posted}</Text>
            </Card>
        ))}
    </Space>
);

// COMPONENT CON: CHI TIẾT JOB
const JobDetail = ({ job }: { job: Job }) => (
    <div className="detail-column">
        <div className="detail-card-scroll">
            <Card title={job.title} bordered>
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
);

function ListJobs() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [levels, setLevels] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [salaries, setSalaries] = useState<string[]>([]);
    const [fields, setFields] = useState<string[]>([]);

    return (
        <>
            <SearchBox />

            <div className="filter-bar">
                <FilterDropdown
                    label="Cấp bậc"
                    options={["Fresher", "Junior", "Senior", "Manager"]}
                    selected={levels}
                    onChange={setLevels}
                />
                <FilterDropdown
                    label="Hình thức làm việc"
                    options={["Full-time", "Part-time", "Remote"]}
                    selected={types}
                    onChange={setTypes}
                />
                <FilterDropdown
                    label="Mức lương"
                    options={["<10 triệu", "10-20 triệu", "20-30 triệu", ">30 triệu"]}
                    selected={salaries}
                    onChange={setSalaries}
                />
                <FilterDropdown
                    label="Lĩnh vực"
                    options={["Web", "Mobile", "AI", "Data"]}
                    selected={fields}
                    onChange={setFields}
                />
                <Button icon={<FilterOutlined />}>Bộ lọc</Button>
            </div>

            <div className="job-container">
                <div className="job-list">
                    <JobList jobs={jobList} selectedId={selectedJob?.id || null} onSelect={setSelectedJob} />
                </div>
                {selectedJob && <JobDetail job={selectedJob} />}
            </div>
        </>
    );
}

export default ListJobs;
