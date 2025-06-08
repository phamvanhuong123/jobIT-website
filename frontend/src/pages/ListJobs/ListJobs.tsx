import {
    Card,
    Typography,
    Space,
    Tag,
    Button,
    Dropdown,
    Checkbox,
    message,
} from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import SearchBox from "~/components/SearchBox/SearchBox";
import "./ListJobs.css";
import JobIT from "./JobIT/JobIT";
import axios from "axios";

const { Title, Text } = Typography;

type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    description: string;
    rawData: any; // giữ dữ liệu gốc để truyền cho JobIT nếu cần
};

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
        menu={{
            items: [
                {
                    key: 'checkbox-group',
                    label: (
                        <div style={{ padding: 10, background: "#fff", borderRadius: 8 }}>
                            <Checkbox.Group
                                value={selected}
                                onChange={onChange}
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                {options.map(opt => (
                                    <Checkbox key={opt} value={opt}>
                                        {opt}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </div>
                    ),
                },
            ],
        }}
    >
        <Button>
            {label} <DownOutlined />
        </Button>
    </Dropdown>

);

const JobList = ({
    jobs,
    selectedId,
    onSelect,
}: {
    jobs: Job[];
    selectedId: string | null;
    onSelect: (job: Job) => void;
}) => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {jobs.map((job) => (
            <Card
                key={job.id}
                hoverable
                onClick={() => onSelect(job)}
                className={`job-card ${selectedId === job.id ? "selected" : ""}`}
            >
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
            </Card>
        ))}
    </Space>
);

function ListJobs() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [jobList, setJobList] = useState<Job[]>([]);
    const [levels, setLevels] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [salaries, setSalaries] = useState<string[]>([]);
    const [fields, setFields] = useState<string[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/jobs");
                const data = res.data;
                console.log("Dữ liệu nhận được từ API:", data);

                const jobsData = data.data; // Lấy đúng mảng công việc từ data.data

                if (!Array.isArray(jobsData)) {
                    throw new Error("Dữ liệu nhận được không phải mảng công việc");
                }

                const jobs: Job[] = jobsData
                    .filter((job: any) => !job.deleted)
                    .sort(
                        (a: any, b: any) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    .slice(0, 20)
                    .map((job: any) => ({
                        id: job._id,
                        title: job.name || "Không rõ",
                        company: job.idCompany || "Chưa có tên công ty",
                        location: job.locations?.[0] || "Không rõ",
                        tags: job.skills || [],
                        posted: new Date(job.createdAt).toLocaleDateString("vi-VN"),
                        description: job.jobDescription?.[0] || "Không có mô tả",
                        rawData: job,
                    }));

                setJobList(jobs);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách công việc:", error);
                message.error("Không thể tải danh sách công việc.");
            }
        };

        fetchJobs();
    }, []);


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
                    options={["Full-time", "Part-time", "Remote", "Onsite"]}
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
                    <JobList
                        jobs={jobList}
                        selectedId={selectedJob?.id || null}
                        onSelect={setSelectedJob}
                    />
                </div>
                {selectedJob && <JobIT job={selectedJob} />}
            </div>
        </>
    );
}

export default ListJobs;
