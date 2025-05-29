import { Card, Typography, Button } from "antd";
import {
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    GiftOutlined,
    UserOutlined,
    EnvironmentOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import "./Profile.css";

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
        title: "Dự án nổi bật",
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
                            <Title level={4} className="name">Nguyễn Văn A</Title>
                            <Text className="sub-title">Cập nhật chức danh</Text>
                            <div className="info-grid">
                                <div><MailOutlined /> vanA1...</div>
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
                    />
                </div>
            </Card>


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
                        <div className="add-icon">+</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
