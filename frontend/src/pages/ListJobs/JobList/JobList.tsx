import React, { useState } from "react";
import "./JobList.css";
import { AuditOutlined, CompassOutlined, DollarOutlined, IdcardOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import timeAgo from '../../utils/timeAgo';
import { useAppSelector } from "~/store";

type Job = {
    id: string;
    title: string;
    idCompany: string; // <-- thêm dòng này
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
    workplace?: string;
    jobDescription: string[];
    rawData: IJob;
};

interface JobListProps {
    jobs: Job[];
    selectedId: string | null;
    onSelect: (job: Job) => void;
    onTagClick?: (tag: string) => void;

}

const JobList: React.FC<JobListProps> = ({ jobs, selectedId, onSelect, onTagClick }) => {
    const isLogin = useAppSelector(state => state.userCandidate.isLogin)
    const navigate = useNavigate();
    const [isHoverCompany, setIsHoverCompany] = useState(false);
    return (
        <div className="job-list-wrapper">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className={`job-card ${selectedId === job.id ? "selected" : ""}`}
                    onClick={() => onSelect(job)}
                >
                    <div className="job-header">
                        <span className="job-posted">Đăng {timeAgo(job.posted)}</span>
                        <span className="job-hot">HOT</span>
                    </div>
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company" style={{
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
                    >{job.nameCompany}</div>
                    {isLogin && job.salary?.min && job.salary?.max ? (
                        <div className="job-salary">
                            <DollarOutlined />
                            <span className="salary-text">
                                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency ?? "USD"}
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



                    <div className="job-position"> <IdcardOutlined style={{ fontSize: "16px" }} /> {job.title}</div>
                    <div className="job-location">
                        <AuditOutlined style={{ fontSize: "16px" }} /> <span>{job.workplace}</span>
                        • <CompassOutlined style={{ fontSize: "16px" }} /> <span>{job.location}</span>
                    </div>
                    <div className="job-tags">
                        {(job.tags ?? []).map((tag, idx) => (
                            <span
                                key={`${job.id}-${tag}-${idx}`}
                                className="job-tag"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick?.(tag);
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobList;
