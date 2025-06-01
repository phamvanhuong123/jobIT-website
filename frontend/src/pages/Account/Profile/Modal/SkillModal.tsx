import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, List, message, Tabs } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

type SkillModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave?: (data: { hardSkills: { skill: string; experience: string }[]; softSkills: string }) => void;

    skillsList: { skill: string; experience: string }[]; // Kỹ năng chính
    setSkillsList: React.Dispatch<React.SetStateAction<{ skill: string; experience: string }[]>>;
};

const skillOptions = [
    "React", "Node.js", "Java", "C#", "Python", "SQL", "HTML", "CSS", "Docker", "AWS",
];

const experienceOptions = [
    { value: "0", label: "Dưới 1 năm" },
    { value: "1", label: "1 năm" },
    { value: "2", label: "2 năm" },
    { value: "3", label: "3 năm" },
    { value: "4", label: "4 năm" },
    { value: "5", label: "5 năm+" },
];

const SkillModal: React.FC<SkillModalProps> = ({
    visible,
    onClose,
    onSave,
    skillsList,
    setSkillsList,
}) => {
    const [form] = Form.useForm();

    // Hard skills state
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [selectedExp, setSelectedExp] = useState<string | null>(null);

    // Soft skills state
    const [softSkillsList, setSoftSkillsList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    // Khi modal mở lại, đồng bộ dữ liệu
    useEffect(() => {
        if (visible) {
            form.setFieldsValue({ hardSkills: skillsList, softSkills: softSkillsList.join(", ") });
        } else {
            form.resetFields();
            setSelectedSkill(null);
            setSelectedExp(null);
            setInputValue("");
            setSoftSkillsList([]);
        }
    }, [visible, skillsList, softSkillsList, form]);

    // Đồng bộ softSkillsList khi form.softSkills thay đổi (khi mở modal hoặc nhận props mới)
    useEffect(() => {
        const softSkillsStr = form.getFieldValue("softSkills") || "";
        const arr = softSkillsStr
            .split(",")
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0);
        setSoftSkillsList(arr);
    }, [form]);

    // Thêm kỹ năng chính (hard skill)
    const handleAddSkill = () => {
        if (!selectedSkill || !selectedExp) {
            message.warning("Vui lòng chọn đầy đủ kỹ năng và kinh nghiệm.");
            return;
        }
        if (skillsList.length >= 10) {
            message.warning("Chỉ được thêm tối đa 10 kỹ năng.");
            return;
        }
        if (skillsList.some((s) => s.skill === selectedSkill)) {
            message.warning("Kỹ năng này đã được thêm.");
            return;
        }
        const newList = [...skillsList, { skill: selectedSkill, experience: selectedExp }];
        setSkillsList(newList);
        form.setFieldsValue({ hardSkills: newList });
        setSelectedSkill(null);
        setSelectedExp(null);
    };

    // Xóa kỹ năng chính
    const handleRemoveSkill = (skill: string) => {
        const newList = skillsList.filter((s) => s.skill !== skill);
        setSkillsList(newList);
        form.setFieldsValue({ hardSkills: newList });
    };

    // Thêm kỹ năng mềm
    const handleAddSoftSkill = () => {
        const skill = inputValue.trim();
        if (!skill) {
            message.error("Vui lòng nhập kỹ năng mềm");
            return;
        }
        if (softSkillsList.length >= 10) {
            message.error("Bạn chỉ được thêm tối đa 10 kỹ năng mềm");
            return;
        }
        if (softSkillsList.includes(skill)) {
            message.error("Kỹ năng này đã được thêm");
            return;
        }

        const newSkills = [...softSkillsList, skill];
        setSoftSkillsList(newSkills);
        form.setFieldsValue({ softSkills: newSkills.join(", ") });
        setInputValue("");
    };

    // Xóa kỹ năng mềm
    const handleRemoveSoftSkill = (skill: string) => {
        const newSkills = softSkillsList.filter((s) => s !== skill);
        setSoftSkillsList(newSkills);
        form.setFieldsValue({ softSkills: newSkills.join(", ") });
    };

    // Lưu dữ liệu
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            // Truyền dữ liệu kỹ năng mềm dưới dạng chuỗi
            onSave &&
                onSave({
                    hardSkills: values.hardSkills || [],
                    softSkills: values.softSkills || "",
                });
            onClose();
        } catch (error) {
            // validation failed
        }
    };

    return (
        <Modal
            title="Chỉnh sửa Kỹ năng"
            visible={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText="Lưu"
            width={800}
            okButtonProps={{ style: { backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" } }}
        >
            <Form form={form} layout="vertical" name="skillForm">
                <Tabs defaultActiveKey="1">
                    {/* Hard Skills Tab */}
                    <Tabs.TabPane tab="Kỹ năng chính" key="1">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 16,
                                color: "red",
                                fontWeight: 500,
                                fontSize: 14,
                            }}
                        >
                            <ExclamationCircleOutlined style={{ marginRight: 8 }} />
                            Mỗi người dùng chỉ có thể chọn tối đa 10 loại kỹ năng và không được trùng lặp.
                        </div>
                        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                            <Select
                                showSearch
                                placeholder="Chọn kỹ năng"
                                value={selectedSkill}
                                style={{ flex: 3, height: 40 }}
                                onChange={(val) => setSelectedSkill(val)}
                                options={skillOptions.map((s) => ({ value: s, label: s }))}
                            />
                            <Select
                                placeholder="Kinh nghiệm"
                                value={selectedExp}
                                style={{ flex: 2, height: 40 }}
                                onChange={(val) => setSelectedExp(val)}
                                options={experienceOptions}
                            />
                            <Button
                                type="primary"
                                onClick={handleAddSkill}
                                style={{ height: 40, backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
                            >
                                Thêm
                            </Button>
                        </div>

                        <Form.Item name="hardSkills" noStyle>
                            <List
                                bordered
                                dataSource={skillsList}
                                locale={{ emptyText: "Chưa có kỹ năng nào" }}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <DeleteOutlined
                                                key="delete"
                                                onClick={() => handleRemoveSkill(item.skill)}
                                                style={{ color: "red" }}
                                            />,
                                        ]}
                                    >
                                        {item.skill} — {experienceOptions.find((e) => e.value === item.experience)?.label}
                                    </List.Item>
                                )}
                            />
                        </Form.Item>
                    </Tabs.TabPane>

                    {/* Soft Skills Tab */}
                    <Tabs.TabPane tab="Kỹ năng mềm" key="2">
                        <Form.Item label="Nhập kỹ năng mềm">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: 16,
                                    color: "red",
                                    fontWeight: 500,
                                    fontSize: 14,
                                }}
                            >
                                <ExclamationCircleOutlined style={{ marginRight: 8 }} />
                                Mỗi người dùng chỉ có thể chọn tối đa 10 loại kỹ năng và không được trùng lặp.
                            </div>
                            <Input
                                placeholder="Nhập kỹ năng mềm"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onPressEnter={(e) => {
                                    e.preventDefault();
                                    handleAddSoftSkill();
                                }}
                                style={{ width: 670, marginRight: 11 }}
                            />
                            <Button type="primary" onClick={handleAddSoftSkill} style={{ backgroundColor: "#ff4d4f" }}>
                                Thêm
                            </Button>
                        </Form.Item>

                        <Form.Item label="Danh sách kỹ năng mềm đã thêm">
                            <List
                                bordered
                                dataSource={softSkillsList}
                                locale={{ emptyText: "Chưa có kỹ năng mềm nào" }}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <DeleteOutlined
                                                key="delete-soft"
                                                onClick={() => handleRemoveSoftSkill(item)}
                                                style={{ color: "red" }}
                                            />,
                                        ]}
                                    >
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Form.Item>

                        {/* Ẩn field để lưu softSkills dạng chuỗi cho form */}
                        <Form.Item name="softSkills" noStyle>
                            <Input type="hidden" />
                        </Form.Item>
                    </Tabs.TabPane>
                </Tabs>
            </Form>
        </Modal>
    );
};

export default SkillModal;
