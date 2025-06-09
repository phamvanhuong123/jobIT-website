// src/pages/ListJobs/ListJobs.tsx
import { useEffect, useState } from "react";
import { message } from "antd";
import SearchBox from "~/components/SearchBox/SearchBox";
import JobList from "./JobList/JobList";
import JobIT from "./JobIT/JobIT";
import FilterBar from "./FilterJob/FilterBar";
import "./ListJobs.css";
import { getAllJob } from "~/services/job.axios";

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
                const res = await getAllJob();
                const jobsData = res.data;

                if (!Array.isArray(jobsData)) throw new Error("Dữ liệu không hợp lệ");

                const jobs: Job[] = jobsData
                    .filter((job) => !job.deleted)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 20)
                    .map((job) => ({
                        id: job._id,
                        title: job.name || "Không rõ",
                        company: job.idCompany || "Chưa có tên công ty",
                        location: job.locations?.[0] || "Không rõ",
                        tags: job.skills || [],
                        posted: new Date(job.createdAt).toLocaleDateString("vi-VN"),
                        description: job.jobDescription?.[0] || "Không có mô tả",
                        jobDescription: job.jobDescription || [],
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
            <FilterBar
                levels={levels}
                types={types}
                salaries={salaries}
                fields={fields}
                setLevels={setLevels}
                setTypes={setTypes}
                setSalaries={setSalaries}
                setFields={setFields}
            />
            <div className="job-container">
                <div className="job-list">
                    <JobList
                        jobs={jobList}
                        selectedId={selectedJob?.id || null}
                        onSelect={(job) => setSelectedJob(job)}
                    />
                </div>
                {selectedJob && <JobIT job={selectedJob} />}
            </div>
        </>
    );
}

export default ListJobs;
