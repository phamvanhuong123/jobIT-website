import { AuditOutlined, ClockCircleOutlined, DollarOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string; // dd/mm/yyyy
    jobDescription: string[];
    rawData: {
        level: string;
        workplace: string;
        salary: {
            min: number;
            max: number;
            currency: string;
        };
        requirements: {
            degree: string[];
            softSkills: string[];
            technicalSkills: string[];
            advantages: string[];
        };
    };
}

// Convert dd/mm/yyyy → yyyy-mm-dd
const convertDMYToISO = (dateStr: string): string | null => {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Format time ago
const timeAgo = (dateString: string): string => {
    const isoDateString = convertDMYToISO(dateString);
    if (!isoDateString) return dateString;

    const now = new Date();
    const postedDate = new Date(isoDateString);
    if (isNaN(postedDate.getTime())) return dateString;

    const diffInMs = now.getTime() - postedDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

function JobIT({ job }: { job: Job }) {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    const handleApplyClick = () => {
        navigate("/apply", { state: { job } });
    };

    const toggleLike = () => {
        setLiked(prev => !prev);
    };

    return (
        <div className="detail-column">
            {/* Header Section */}
            <div className="job-header-sticky">
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: 24,
                        flexWrap: "wrap",
                        gap: 16,
                        flexDirection: "column",
                        padding: "24px",
                        borderRadius: " 12px",
                    }}
                >
                    <div style={{ flex: 5, minWidth: 200 }}>
                        <Title level={4} style={{ margin: 0, fontSize: "20px" }}>{job.title}</Title>
                        <Text strong style={{ fontSize: "16px" }}>{job.company}</Text>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                minWidth: 160,
                                marginTop: 4,
                                fontSize: "16px",
                            }}
                        >
                            <DollarOutlined style={{ fontSize: "16px" }} />
                            <a className="job-salary-link" href="#">
                                Sign in to view salary
                            </a>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            type="primary"
                            className="apply-button"
                            style={{
                                backgroundColor: "#ed1b2f",
                                borderColor: "#ed1b2f",
                                minWidth: "660px",
                                padding: "20px 20px"
                            }}
                            onClick={handleApplyClick}
                        >
                            Apply Now
                        </Button>

                        <div style={{ marginTop: 4 }}>
                            <Button
                                className={`heart-button ${liked ? "liked" : ""}`}
                                shape="circle"
                                icon={liked ? <HeartFilled /> : <HeartOutlined />}
                                onClick={toggleLike}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-card-scroll">
                <Card>




                    {/* Location & Posted & Level & Workplace  */}
                    <p style={{ fontSize: "14px" }}><strong>Location:</strong> {job.location}</p>
                    <div>
                        <ClockCircleOutlined /> <span className="job-posted">Posted {timeAgo(job.posted)}</span>
                    </div>
                    <p style={{ fontSize: "14px" }}><strong>Level:</strong> {job.rawData.level}</p>
                    <div>
                        <AuditOutlined /><span className="job-workplace"> {job.rawData.workplace}</span>
                    </div>

                    <Divider style={{ borderColor: "#dedede", borderTopWidth: 3, margin: "24px 0" }} />

                    {/* Tags & Metadata */}
                    <div className="job-tags" style={{ marginBottom: 12, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                        <Text strong style={{ fontSize: "16px", marginRight: 8 }}>Skills:</Text>
                        {job.tags.map((skill, idx) => (
                            <Tag key={idx} color="blue">{skill}</Tag>
                        ))}
                    </div>
                    <p><strong>Job Expertise:</strong> {job.title}</p>
                    <Divider style={{ borderColor: "#dedede", borderTopWidth: 3, margin: "24px 0" }} />

                    {/* Job Description */}
                    <Title level={5}>Job Description</Title>
                    <ul>
                        {(job.jobDescription ?? []).map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>

                    <Divider style={{ borderColor: "#dedede", borderTopWidth: 3, margin: "24px 0" }} />

                    {/* Skills and Experience */}
                    <Title level={5}>Your Skills and Experience</Title>
                    {job.rawData.requirements.degree?.length > 0 && (
                        <p><strong>Degree:</strong> {job.rawData.requirements.degree.join(", ")}</p>
                    )}
                    {job.rawData.requirements.technicalSkills?.length > 0 && (
                        <p><strong>Technical Skills:</strong> {job.rawData.requirements.technicalSkills.join(", ")}</p>
                    )}
                    {job.rawData.requirements.softSkills?.length > 0 && (
                        <p><strong>Soft Skills:</strong> {job.rawData.requirements.softSkills.join(", ")}</p>
                    )}

                    <Divider style={{ borderColor: "#dedede", borderTopWidth: 3, margin: "24px 0" }} />

                    {/* Benefits */}
                    {job.rawData.requirements.advantages?.length > 0 && (
                        <>
                            <Title level={5}>Nice-to-Have Skills:</Title>
                            <ul style={{ fontSize: "16px", lineHeight: 1.5 }}>
                                {job.rawData.requirements.advantages.map((adv, idx) => (
                                    <li key={idx}>{adv}</li>
                                ))}
                            </ul>
                        </>
                    )}

                </Card>
            </div>
        </div>
    );
}

export default JobIT;
