import React, { useState } from "react";
import "./JobList.css";
import { AuditOutlined, CompassOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    description: string;
    jobDescription: string[]; // ✅ Thêm dòng này
    rawData: IJob;
};
// Chuyển dd/mm/yyyy sang yyyy-mm-dd
const convertDMYToISO = (dateStr: string): string | null => {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Định dạng "x days ago"
const timeAgo = (dateString: string): string => {
    const isoDateString = convertDMYToISO(dateString);
    if (!isoDateString) return dateString;

    const now = new Date();
    const postedDate = new Date(isoDateString);
    if (isNaN(postedDate.getTime())) return dateString;

    const diffInMs = now.getTime() - postedDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return "1 giờ trước";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
};



interface JobListProps {
    jobs: Job[];
    selectedId: string | null;
    onSelect: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedId, onSelect }) => {
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
                        fontSize: "16px",
                        cursor: "pointer",
                        textDecoration: isHoverCompany ? "underline" : "none",
                    }}
                        onClick={() => navigate("/company")}
                        onMouseEnter={() => setIsHoverCompany(true)}
                        onMouseLeave={() => setIsHoverCompany(false)}
                    >{job.company}</div>
                    <a className="job-salary-link" style={{ color: "#1677ff", cursor: "pointer" }}
                        onClick={() => navigate("/dang-nhap")}>Đăng nhập để xem mức lương</a>

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
