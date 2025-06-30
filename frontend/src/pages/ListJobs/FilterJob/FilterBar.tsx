// ~/pages/ListJobs/FilterJob/FilterBar.tsx
import { useEffect, useState } from "react";
import { Button, message, Space } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import FilterDropdown from "../FilterJob/FilterDropdown";
import { getAllJob } from "~/services/job.axios";

const salaryOptions = ["<1000 USD", "1000-2000 USD", "2000-3000 USD", ">3000 USD"];

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

function normalizeJob(job: any): Job {
    return {
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
        workplace: job.workplace || "Không rõ",
        rawData: job,
    };
}

const FilterBar = ({
    levels,
    types,
    salaries,
    fields,
    setLevels,
    setTypes,
    setSalaries,
    setFields,
    setJobList,
}: {
    levels: string[];
    types: string[];
    salaries: string[];
    fields: string[];
    setLevels: (val: string[]) => void;
    setTypes: (val: string[]) => void;
    setSalaries: (val: string[]) => void;
    setFields: (val: string[]) => void;
    setJobList: (val: any[]) => void;
}) => {
    const [levelOptions, setLevelOptions] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);
    const [fieldOptions, setFieldOptions] = useState<string[]>([]);
    const [allJobs, setAllJobs] = useState<any[]>([]); // lưu toàn bộ để lọc tại frontend

    // Lấy toàn bộ dữ liệu job và các options
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const res = await getAllJob("");
                const jobs = Array.isArray(res.data) ? res.data : [];

                const unique = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));

                setLevelOptions(unique(jobs.map((j: any) => j.level)));
                setTypeOptions(unique(jobs.map((j: any) => j.workplace)));
                const allFields = jobs.flatMap((j: any) => j.skills || []);
                setFieldOptions(unique(allFields));

                setAllJobs(jobs); // lưu lại để lọc sau
                setJobList(jobs.filter((j: any) => !j.deleted)); // hiển thị mặc định
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu lọc:", error);
                message.error("Không thể tải dữ liệu công việc.");
            }
        };

        fetchInitialData();
    }, []);

    // Lọc dữ liệu phía frontend mỗi khi có thay đổi filter
    useEffect(() => {
        const filtered = allJobs.filter((job: any) => {
            if (job.deleted) return false;

            if (levels.length && !levels.includes(job.level)) return false;

            if (types.length && !types.includes(job.workplace)) return false;

            if (fields.length && (!Array.isArray(job.skills) || !fields.some(f => job.skills.includes(f)))) return false;

            if (salaries.length) {
                const matched = salaries.some((salaryOption) => {
                    const [min, max] = (() => {
                        switch (salaryOption) {
                            case "<1000 USD": return [0, 1000];
                            case "1000-2000 USD": return [1000, 2000];
                            case "2000-3000 USD": return [2000, 3000];
                            case ">3000 USD": return [3000, 99999];
                            default: return [0, Infinity];
                        }
                    })();

                    return (
                        job.salary &&
                        job.salary.min >= min &&
                        job.salary.max <= max
                    );
                });

                if (!matched) return false;
            }

            return true;
        });

        setJobList(filtered.map(normalizeJob));
    }, [levels, types, fields, salaries]);

    // Reset bộ lọc
    const handleResetFilters = () => {
        setLevels([]);
        setTypes([]);
        setSalaries([]);
        setFields([]);
        setJobList(allJobs.filter((j: any) => !j.deleted).map(normalizeJob));
    };

    return (
        <div className="filter-bar" style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "16px 0" }}>
            <FilterDropdown label="Cấp bậc" options={levelOptions} selected={levels} onChange={setLevels} />
            <FilterDropdown label="Hình thức" options={typeOptions} selected={types} onChange={setTypes} />
            <FilterDropdown label="Mức lương" options={salaryOptions} selected={salaries} onChange={setSalaries} />
            <FilterDropdown label="Lĩnh vực" options={fieldOptions} selected={fields} onChange={setFields} />

            <Space>
                <Button icon={<FilterOutlined />}>Bộ lọc</Button>
                <Button icon={<ReloadOutlined />} onClick={handleResetFilters}>
                    Reset
                </Button>
            </Space>
        </div>
    );
};

export default FilterBar;
