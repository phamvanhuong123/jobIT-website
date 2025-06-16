import {
    AuditOutlined,
    CompassOutlined,
    DollarOutlined,
    IdcardOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "~/store";
import timeAgo from "../utils/timeAgo";
import { Divider } from "antd";

type Job = {
    id: string;
    title: string;
    idCompany: string;
    nameCompany?: string;
    company: string;
    location: string;
    salary: {
        min: number;
        max: number;
        currency: string;
    };
    tags: string[];
    posted: string;
    jobDescription: string[];
    rawData: IJob; // đảm bảo IJob có field reasonToJoin nếu cần
};

interface JobListProps {
    jobs: Job[];
    company: ICompany | null;
    selectedId: string | null;
    onSelect: (job: Job) => void;
}

const CompanyJobList: React.FC<JobListProps> = ({ jobs, onSelect, company }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const isLogin = useAppSelector(state => state.userCandidate.isLogin);
    const navigate = useNavigate();
    const [isHoverCompany, setIsHoverCompany] = useState(false);

    const handleSelect = (job: Job) => {
        setSelectedId(job.id);
        onSelect(job);
    };

    return (
        <div
            className="job-list-wrapper"
            style={{
                position: "sticky",
                top: "80px", // điều chỉnh nếu có header
                maxHeight: "calc(100vh - 100px)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                className="job-list-header"
                style={{
                    zIndex: 1,
                    paddingBottom: "8px",
                    borderBottom: "1px solid #eee",
                }}
            >
                <h3 style={{ marginBottom: 0, fontSize: "22px" }}>
                    {jobs.length} việc làm đang tuyển dụng
                </h3>
            </div>

            <div
                className="job-list-content"
                style={{
                    overflowY: "auto",
                    flex: 1,
                    paddingRight: "8px",
                }}
            >
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className={`job-card ${selectedId === job.id ? "selected" : ""}`}
                        onClick={() => handleSelect(job)}
                    >
                        <div className="job-header">
                            <span className="job-posted">Đăng {timeAgo(job.posted)}</span>
                            <span className="job-hot">HOT</span>
                        </div>

                        <h3 className="job-title">{job.title}</h3>

                        <div
                            className="job-company"
                            style={{
                                width: "60%",
                                fontSize: "16px",
                                cursor: "pointer",
                                textDecoration: isHoverCompany ? "underline" : "none",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/company/${job.rawData.idCompany}`);
                            }}
                            onMouseEnter={() => setIsHoverCompany(true)}
                            onMouseLeave={() => setIsHoverCompany(false)}
                        >
                            {job.nameCompany}
                        </div>

                        {isLogin && job.salary?.min && job.salary?.max ? (
                            <div className="job-salary">
                                <DollarOutlined />
                                <span className="salary-text">
                                    {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}{" "}
                                    {job.salary.currency ?? "USD"}
                                </span>
                            </div>
                        ) : (
                            !isLogin && (
                                <Link
                                    to="/dang-nhap"
                                    className="job-salary-link"
                                    style={{ color: "#1677ff", cursor: "pointer", width: "60%" }}
                                >
                                    Đăng nhập để xem mức lương
                                </Link>
                            )
                        )}

                        <div className="job-position">
                            <IdcardOutlined style={{ fontSize: "16px" }} /> {job.title}
                        </div>

                        <div className="job-location">
                            <AuditOutlined style={{ fontSize: "16px" }} />{" "}
                            <span>{job.rawData.workplace}</span> •{" "}
                            <CompassOutlined style={{ fontSize: "16px" }} />{" "}
                            <span>{job.location}</span>
                        </div>

                        <div className="job-tags">
                            {(job.tags || []).map((tag, idx) => (
                                <span key={idx} className="job-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                        {company?.whyLove && company?.whyLove.length > 0 && (
                            <div
                                className="company-why-love"
                                style={{
                                    marginTop: "2px",
                                    padding: "8px",
                                    borderRadius: "6px",
                                }}
                            >
                                <ul className="love-list" >
                                    {company.whyLove.map((item, idx) => (
                                        <li key={idx} style={{ fontSize: "14px" }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );


};

export default CompanyJobList;
