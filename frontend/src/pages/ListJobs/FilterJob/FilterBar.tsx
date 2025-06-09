// ListJobs/FilterBar.tsx
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import FilterDropdown from "./FilterDropdown";

const FilterBar = ({
    levels,
    types,
    salaries,
    fields,
    setLevels,
    setTypes,
    setSalaries,
    setFields,
}: any) => (
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
);

export default FilterBar;
