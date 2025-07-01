import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, List, message } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUpdateCandidate } from "~/features/candidate.slice";
import { toast } from "react-toastify";

type Language = { name: string; level: string };

type LanguageModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave?: (data: { languages: Language[] }) => void;
    languagesList: Language[];
    setLanguagesList: React.Dispatch<React.SetStateAction<Language[]>>;
};

const LanguageModal: React.FC<LanguageModalProps> = ({
    visible,
    onClose,
    onSave,
    languagesList,
    setLanguagesList,
}) => {
    const [form] = Form.useForm();
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const user = useAppSelector((state) => state.userCandidate.candidate);
    const dispatch = useAppDispatch();
    const languageOptions = [
        "Tiếng Anh",
        "Tiếng Pháp",
        "Tiếng Trung",
        "Tiếng Nhật",
        "Tiếng Hàn",
        "Tiếng Đức",
        "Tiếng Tây Ban Nha",
        "Tiếng Ý",
        "Tiếng Nga",
        "Tiếng Việt",
    ];

    const levelOptions = [
        { value: "basic", label: "Cơ bản" },
        { value: "intermediate", label: "Trung cấp" },
        { value: "advanced", label: "Nâng cao" },
        { value: "fluent", label: "Thông thạo" },
        { value: "native", label: "Bản ngữ" },
    ];

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({ languages: languagesList });
        } else {
            form.resetFields();
            setSelectedLanguage(null);
            setSelectedLevel(null);
        }
    }, [visible, languagesList, form]);

    const handleAddLanguage = () => {
        if (!selectedLanguage || !selectedLevel) {
            message.warning("Vui lòng chọn đầy đủ ngôn ngữ và trình độ.");
            return;
        }
        if (languagesList.length >= 5) {
            message.warning("Bạn chỉ được chọn tối đa 5 ngôn ngữ.");
            return;
        }
        if (languagesList.some((l) => l.name === selectedLanguage)) {
            message.warning("Ngôn ngữ này đã được chọn.");
            return;
        }
        const newList = [...languagesList, { name: selectedLanguage, level: selectedLevel }];
        setLanguagesList(newList);
        form.setFieldsValue({ languages: newList });
        setSelectedLanguage(null);
        setSelectedLevel(null);
    };

    const handleRemoveLanguage = (language: string) => {
        const newList = languagesList.filter((l) => l.name !== language);
        setLanguagesList(newList);
        form.setFieldsValue({ languages: newList });
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log(values)
            if (user?.idAccount) {
                    dispatch(fetchUpdateCandidate({ id: user.idAccount, body: values }))
                      .unwrap()
                      .then(() => {
                        toast.success("Cật nhật thành công");
                      })
                      .catch((e) => {
                        console.log("Lỗi ", e), toast.error("Cật nhật thất bại");
                      });
                  }
            onSave && onSave(values);
            onClose();
        } catch (error) {
            // validation failed
        }
    };

    return (
        <Modal
            title="Quản lý Ngôn ngữ"
            visible={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText="Lưu"
            width={700}
            okButtonProps={{ style: { backgroundColor: "#ff4d4f", borderColor: "#1890ff" } }}
        >   <div style={{ display: "flex", alignItems: "center", marginBottom: 16, color: "red", fontWeight: "500" }}>
                <ExclamationCircleOutlined style={{ marginRight: 8 }} />
                Mỗi người dùng chỉ có thể chọn tối đa 5 loại ngôn ngữ và không được trùng lặp.
            </div>
            <Form form={form} layout="vertical" name="languageForm">
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <Select
                        showSearch
                        placeholder="Chọn ngôn ngữ"
                        value={selectedLanguage}
                        style={{ flex: 3, height: 40 }}
                        onChange={(val) => setSelectedLanguage(val)}
                        options={languageOptions.map((lang) => ({ value: lang, label: lang }))}
                        allowClear
                    />
                    <Select
                        placeholder="Chọn trình độ"
                        value={selectedLevel}
                        style={{ flex: 2, height: 40 }}
                        onChange={(val) => setSelectedLevel(val)}
                        options={levelOptions}
                        allowClear
                    />
                    <Button
                        type="primary"
                        onClick={handleAddLanguage}
                        style={{ height: 40, backgroundColor: "#ff4d4f", borderColor: "#1890ff" }}
                    >
                        Thêm
                    </Button>
                </div>

                <Form.Item name="languages" noStyle>
                    <List
                        bordered
                        dataSource={languagesList}
                        locale={{ emptyText: "Chưa có ngôn ngữ nào được chọn" }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <DeleteOutlined
                                        key="delete"
                                        onClick={() => handleRemoveLanguage(item.name)}
                                        style={{ color: "red" }}
                                    />,
                                ]}
                            >
                                {item.name} — {levelOptions.find((l) => l.value === item.level)?.label}
                            </List.Item>
                        )}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LanguageModal;
