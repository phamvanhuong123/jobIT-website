import React from "react";
import "./JobList.css";

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

    if (diffInHours < 1) {
        return "1 hour ago";
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
};


interface JobListProps {
    jobs: Job[];
    selectedId: string | null;
    onSelect: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedId, onSelect }) => {
    return (
        <div className="job-list-wrapper">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className={`job-card ${selectedId === job.id ? "selected" : ""}`}
                    onClick={() => onSelect(job)}
                >
                    <div className="job-header">
                        <span className="job-posted">Posted {timeAgo(job.posted)}</span>
                        <span className="job-hot">HOT</span>
                    </div>
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company">{job.company}</div>
                    <a className="job-salary-link" href="#">Sign in to view salary</a>
                    <div className="job-position">{job.title}</div>
                    <div className="job-location">
                        <span>{job.rawData.workplace}</span> • <span>{job.location}</span>
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
