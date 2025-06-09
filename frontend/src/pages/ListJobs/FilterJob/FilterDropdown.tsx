
import { Dropdown, Button, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";

const FilterDropdown = ({
    label,
    options,
    selected,
    onChange,
}: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (val: string[]) => void;
}) => (
    <Dropdown
        trigger={["click"]}
        menu={{
            items: [
                {
                    key: 'checkbox-group',
                    label: (
                        <div style={{ padding: 10, background: "#fff", borderRadius: 8 }}>
                            <Checkbox.Group
                                value={selected}
                                onChange={onChange}
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                {options.map(opt => (
                                    <Checkbox key={opt} value={opt}>
                                        {opt}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </div>
                    ),
                },
            ],
        }}
    >
        <Button>
            {label} <DownOutlined />
        </Button>
    </Dropdown>
);

export default FilterDropdown;
