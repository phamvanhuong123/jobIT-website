import { useEffect, useState } from "react";
import { message } from "antd";
import SearchBox from "~/components/SearchBox/SearchBox";
import JobList from "./JobList/JobList";
import JobIT from "./JobIT/JobIT";
import FilterBar from "./FilterJob/FilterBar";
import "./ListJobs.css";
import { getAllJob } from "~/services/job.axios";
import { useLocation } from "react-router";

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
    workplace?: string;
    rawData: IJob;
};

function ListJobs() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [jobList, setJobList] = useState<Job[]>([]);

    // Các state lọc
    const [levels, setLevels] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [salaries, setSalaries] = useState<string[]>([]);
    const [fields, setFields] = useState<string[]>([]);


    const location = useLocation();
    const query = location.search;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getAllJob(query);
                const jobsData = res.data;

                if (!Array.isArray(jobsData)) throw new Error("Dữ liệu không hợp lệ");

                const jobs: Job[] = jobsData
                    .filter((job) => !job.deleted)
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 20)
                    .map((job): Job => ({
                        id: job._id,
                        title: job.name || "Không rõ",
                        idCompany: job.idCompany?.toString() || "",
                        nameCompany: job.nameCompany?.toString(),
                        company: (job.nameCompany || job.idCompany || "Chưa có tên công ty").toString(),
                        location: job.locations?.[0] || "Không rõ",
                        salary: job.salary,
                        tags: Array.isArray(job.skills) ? job.skills : [],
                        posted: new Date(job.updatedAt).toLocaleDateString("vi-VN"),
                        jobDescription: job.jobDescription || [],
                        workplace: job.workplace || "Không rõ", // <-- bổ sung để tránh undefined
                        rawData: job,
                    }));

                setJobList(jobs);

                // ✅ Trích xuất dữ liệu bộ lọc từ dữ liệu thật
                const levelSet = new Set<string>();
                const typeSet = new Set<string>();
                const fieldSet = new Set<string>();

                jobsData.forEach((job: any) => {
                    if (job.level) levelSet.add(job.level);
                    if (job.workplace) typeSet.add(job.workplace);
                    if (Array.isArray(job.skills)) {
                        job.skills.forEach((skill: string) => fieldSet.add(skill));
                    }
                });

            } catch (error) {
                console.error("Lỗi khi lấy danh sách công việc:", error);
                message.error("Không thể tải danh sách công việc.");
            }
        };

        fetchJobs();
    }, [query]);

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
                setJobList={setJobList}
            />
            <div className="job-container">
                <div className="job-list">
                    <JobList
                        jobs={jobList}
                        selectedId={selectedJob?.id || null}
                        onSelect={(job) => setSelectedJob(job)}
                        onTagClick={(tag) => {
                            if (!fields.includes(tag)) {
                                setFields([...fields, tag]);
                            }
                        }}
                    />
                </div>
                {selectedJob && <JobIT job={selectedJob} />}
            </div>
        </>
    );
}

export default ListJobs;
