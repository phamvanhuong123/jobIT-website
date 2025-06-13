import React, { useState } from "react";
import "./JobList.css";
import { AuditOutlined, CompassOutlined, IdcardOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import timeAgo from '../../utils/timeAgo';
import { useAppSelector } from "~/store";

type Job = {
    id: string;
    title: string;
    company: string; // Thay String thành string
    nameCompany?: string; // Thay String thành string
    location: string;
    salary : {
        min : Number,
        max : Number
    }
    tags: string[];
    posted: string;
    description: string;
    jobDescription: string[];
    rawData: IJob;
};

interface JobListProps {
    jobs: Job[];
    selectedId: string | null;
    onSelect: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedId, onSelect }) => {
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
                        onClick={() => navigate("/company")}
                        onMouseEnter={() => setIsHoverCompany(true)}
                        onMouseLeave={() => setIsHoverCompany(false)}
                    >{job.company}</div>
                    {isLogin ? 2000 : <Link to={"/dang-nhap"} className="job-salary-link" style={{ color: "#1677ff", cursor: "pointer", width: "60%" }}>Đăng nhập để xem mức lương</Link>}

                    <div className="job-position"> <IdcardOutlined /> {job.title}</div>
                    <div className="job-location">
                        <AuditOutlined /> <span>{job.rawData.workplace}</span> • <CompassOutlined /> <span>{job.location}</span>
                    </div>
                    <div className="job-tags">
                        {job.tags.map((tag, idx) => (
                            <span key={idx} className="job-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobList;
