import {
    Card,
    Typography,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Row,
    Col,
} from "antd";
import {
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    GiftOutlined,
    UserOutlined,
    EnvironmentOutlined,
    LinkOutlined,
    DeleteOutlined,
    CameraOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import "./Profile.css";
import SectionModals from "./SectionModals.tsx";
import { useAppSelector } from "~/store.ts";

const { Title, Text } = Typography;

const sections = [
    {
        title: "Giới thiệu bản thân",
        desc: "Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn",
        icon: "🧠",
    },
    {
        title: "Học vấn",
        desc: "Chia sẻ trình độ học vấn của bạn",
        icon: "🎓",
    },
    {
        title: "Kinh nghiệm làm việc",
        desc: "Thể hiện những thông tin chi tiết về quá trình làm việc",
        icon: "💼",
    },
    {
        title: "Kỹ năng",
        desc: "Liệt kê các kỹ năng chuyên môn của bạn",
        icon: "⚙️",
    },
    {
        title: "Ngoại ngữ",
        desc: "Liệt kê các ngôn ngữ mà bạn biết",
        icon: "🈯",
    },
    {
        title: "Dự án nổi bật",
        desc: "Giới thiệu dự án nổi bật của bạn",
        icon: "🚀",
    },
    {
        title: "Chứng chỉ",
        desc: "Bổ sung chứng chỉ liên quan đến kỹ năng của bạn",
        icon: "📜",
    },
    {
        title: "Giải thưởng",
        desc: "Thể hiện giải thưởng hoặc thành tích mà bạn đạt được",
        icon: "🏆",
    },
];



function Profile() {
    const user = useAppSelector(state => state.userCandidate.candidate)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            console.log("Thông tin đã lưu:", values);
            setIsModalOpen(false);
        });
    };
    const [openSection, setOpenSection] = useState<number | null>(null);


    return (
        <div className="profile-container">
            {/* Header */}
            <Card className="profile-header">
                <div className="profile-top">
                    <div className="avatar-section">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="avatar"
                            className="avatar"
                        />
                        <div>
                            <Title level={4} className="name">{user?.fullName}</Title>
                            <Text className="sub-title">Cập nhật chức danh</Text>
                            <div className="info-grid">
                                <div><MailOutlined /> {user?.email}</div>
                                <div><PhoneOutlined /> 0388779542</div>
                                <div><GiftOutlined /> Ngày sinh: 30/09/1992</div>
                                <div><UserOutlined /> Giới tính: Nam</div>
                                <div><EnvironmentOutlined /> số 78, đường Nguyễn văn Cừ, p. Ngô mây, Tp. Quy Nhơn, Bình Định</div>
                                <div><LinkOutlined /> Link cá nhân</div>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="edit-icon-btn"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={handleOpenModal}
                    />
                </div>
            </Card>
            {/* Modal cho phần trên */}
            <Modal
                title="Thông tin cá nhân"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSave} style={{ backgroundColor: "#ff4d4f", borderColor: "#fa8c16" }}>
                        Lưu
                    </Button>,
                ]}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={24}>
                        <Col span={6} style={{ textAlign: "center" }}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="avatar"
                                style={{ width: 80, marginBottom: 8 }}
                            />
                            <div>
                                <Button type="link" icon={<CameraOutlined />}>Sửa</Button>
                                <Button type="link" icon={<DeleteOutlined />}>Xoá</Button>
                            </div>
                        </Col>
                        <Col span={18}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="fullName" label="Họ và Tên" validateTrigger="onBlur" rules={[{
                                        required: true, message: 'Vui lòng điền họ và tên của bạn'
                                    }]}>
                                        <Input defaultValue="Nguyễn Văn A" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="position" label="Chức danh" validateTrigger="onBlur" rules={[{
                                        required: true, message: 'Vui lòng điền chức danh của bạn'
                                    }]}>
                                        <Input placeholder="Nhập chức danh" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="email" label="Địa chỉ email">
                                        <Input disabled defaultValue="vanA1@gmail.com" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phone" label="Số điện thoại" validateTrigger="onBlur" rules={[{ required: true, message: 'Vui lòng điền số điện thoại của bạn' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="dob" label="Ngày sinh" validateTrigger="onBlur" rules={[{ required: true, message: 'Vui lòng điền ngày sinh của bạn' }]}>
                                        <DatePicker style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="gender" label="Giới tính">
                                        <Select defaultValue="Nam" options={[{ value: "Nam" }, { value: "Nữ" }]} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="city" label="Tỉnh/Thành phố hiện tại" rules={[{ required: true }]}>
                                        <Select placeholder="Chọn tỉnh/thành phố" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="address" label="Địa chỉ(Tên đường, quận/huyện">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="link" label="Link cá nhân (Linkedin, portfolio,...)">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal >


            {/* Section list */}
            <div className="section-list">
                {sections.map((section, idx) => (
                    <div key={idx} className="section-card">
                        <div className="section-left">
                            <div className="section-icon">{section.icon}</div>
                            <div>
                                <div className="section-title">{section.title}</div>
                                <div className="section-desc">{section.desc}</div>
                            </div>
                        </div>
                        <div className="add-icon" onClick={() => setOpenSection(idx)}>+</div>
                    </div>
                ))}
            </div>
            <SectionModals openSection={openSection} onClose={() => setOpenSection(null)} />
        </div >
    );
}

export default Profile;
