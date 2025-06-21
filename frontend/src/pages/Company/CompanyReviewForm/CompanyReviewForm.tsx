import { useEffect, useState } from "react";
import {
    Card,
    Radio,
    Input,
    Rate,
    Button,
    Typography,
    Form,
    Modal,
    message,
} from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllCompany } from "~/services/company.axios";
import { useAppSelector } from "~/store";
import { ExportOutlined, LeftOutlined } from "@ant-design/icons";
import "./CompanyReviewForm.css";
import { createCompanyReview } from "~/services/companyReview.axios";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { Title, Text } = Typography;

interface ReviewFormValues {
    overall: number;
    summary: string;
    love: string;
    suggestion: string;
    salary?: number;
    training?: number;
    management?: number;
    culture?: number;
    workspace?: number;
    recommend: string;
}

const CompanyReviewForm = () => {
    const [form] = Form.useForm();
    const { idCompany } = useParams();
    const [companyName, setCompanyName] = useState("Đang tải...");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = useAppSelector((state) => state.userCandidate.isLogin);

    const rateDescriptions = [
        "Rất tệ",
        "Cần cải thiện nhiều",
        "Trung lập",
        "Tốt",
        "Xuất sắc",
    ];

    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const res = await getAllCompany();
                const matchedCompany = res?.data?.find(
                    (c: any) => c._id === idCompany
                );
                setCompanyName(matchedCompany?.name || "Không rõ");
            } catch (err) {
                setCompanyName("Không rõ");
            }
        };
        if (idCompany) fetchCompanyName();
    }, [idCompany]);

    const handleBackClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => setIsModalVisible(false);

    const handleConfirmExit = () => navigate(`/company/${idCompany}`);

    const accountId = useAppSelector(state => state.userCandidate.candidate?.idAccount);

    const handleSubmit = async (values: ReviewFormValues) => {
        if (!isLogin || !accountId) {
            message.info("Vui lòng đăng nhập để gửi đánh giá.");
            navigate("/dang-nhap", {
                state: { redirectTo: location.pathname },
            });
            return;
        }

        try {
            const payload = {
                accountId,
                companyId: idCompany!,
                title: values.summary,
                rating: values.overall,
                positiveFeedback: values.love,
                negativeFeedback: values.suggestion,
            };
            console.log("Gửi đánh giá:", payload);

            const res = await createCompanyReview(payload);

            if (
                res?.status === 200 ||
                res?.message?.toLowerCase()?.includes("success")
            ) {
                toast.success("Gửi đánh giá thành công!");
                setTimeout(() => {
                    navigate(`/company/${idCompany}`);
                }, 1000);
            } else {
                toast.error(res?.message || "Gửi đánh giá thất bại.");
            }
        } catch (err: any) {
            console.error("Lỗi gửi đánh giá:", err);
            const errorMessage =
                err?.response?.data?.message || "Đã xảy ra lỗi khi gửi đánh giá.";
            toast.error(errorMessage);
        }

    };

    return (
        <div>
            <div className="review-header">
                <Button className="btn_submit" onClick={handleBackClick}>
                    <LeftOutlined />
                    Quay lại
                </Button>
                <div
                    className="header__logo"
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "#fff",
                    }}
                >
                    Job<span>IT</span>
                    <div style={{ width: 75 }} />
                </div>
            </div>

            <div className="review-wrapper">
                <Card className="review-left">
                    <Title level={4}>Đánh giá cho {companyName}</Title>
                    <Text>
                        Bạn chỉ mất 1 phút để hoàn thành bảng đánh giá này. Ý kiến của bạn
                        sẽ giúp ích rất nhiều cho cộng đồng Developer đang tìm việc.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="mt-6"
                    >
                        <Form.Item
                            name="overall"
                            label="Đánh giá chung"
                            rules={[{ required: true }]}
                        >
                            <Rate tooltips={rateDescriptions} />
                        </Form.Item>

                        <Form.Item
                            name="summary"
                            rules={[{ required: true, message: "Thêm nội dung" }]}
                        >
                            <Input
                                placeholder="Tiêu đề"
                                style={{
                                    height: "56px",
                                    fontSize: "16px",
                                    marginBottom: "10px",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="love"
                            label="Điều làm bạn thích làm việc tại đây"
                            rules={[
                                { required: true, message: "Thêm nội dung" },
                                { min: 50, message: "Tối thiểu 50 ký tự" },
                            ]}
                        >
                            <TextArea rows={6} placeholder="Nhập nội dung" showCount />
                        </Form.Item>

                        <Form.Item
                            name="suggestion"
                            label="Đề nghị cải thiện"
                            rules={[
                                { required: true, message: "Thêm nội dung" },
                                { min: 50, message: "Tối thiểu 50 ký tự" },
                            ]}
                        >
                            <TextArea rows={6} placeholder="Nhập nội dung" showCount />
                        </Form.Item>

                        <Form.Item
                            name="recommend"
                            label="Bạn có muốn giới thiệu công ty này đến bạn bè của mình?"
                            rules={[{ required: true }]}
                        >
                            <Radio.Group
                                style={{ display: "flex", flexDirection: "column", gap: 8 }}
                            >
                                <Radio value="Yes">Có</Radio>
                                <Radio value="No">Không</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item className="text-center mt-4">
                            <Button type="primary" htmlType="submit" className="submit-btn">
                                Gửi đánh giá
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className="review-right">
                    <Title level={5}>Hướng dẫn và điều kiện về đánh giá</Title>
                    <Text>
                        Mọi đánh giá phải tuân thủ Hướng Dẫn & Điều Kiện về đánh giá để được
                        hiển thị trên website
                    </Text>
                    <ul className="review-list">
                        <li>
                            <span className="dot"></span>Không sử dụng từ ngữ xúc phạm
                        </li>
                        <li>
                            <span className="dot"></span>Không cung cấp thông tin cá nhân
                        </li>
                        <li>
                            <span className="dot"></span>Không tiết lộ bí mật kinh doanh
                        </li>
                    </ul>
                    <div className="review-detail-link">
                        <Text className="info-text">
                            Cảm ơn bạn đã đánh giá. Xem thêm Hướng Dẫn & Điều Kiện.
                        </Text>
                        <a href="#" className="see-more-link">
                            Xem chi tiết <ExportOutlined />
                        </a>
                    </div>
                </Card>

                <Modal
                    title="Hủy đánh giá"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="continue" onClick={handleCancel}>
                            Tiếp tục đánh giá
                        </Button>,
                        <Button key="exit" danger type="primary" onClick={handleConfirmExit}>
                            Đồng ý
                        </Button>,
                    ]}
                >
                    <p>
                        Tất cả thông tin đã nhập sẽ không được lưu lại. Bạn có chắc chắn muốn
                        thoát?
                    </p>
                </Modal>
            </div>
        </div>
    );
};

export default CompanyReviewForm;
