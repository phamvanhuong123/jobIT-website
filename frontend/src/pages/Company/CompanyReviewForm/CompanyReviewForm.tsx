import { useEffect, useState } from 'react';
import { Card,  Input, Rate, Button, Typography, Form, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCompany } from '~/services/company.axios'; // đảm bảo đường dẫn chính xác
import './CompanyReviewForm.css';
import { ExportOutlined, LeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;



const CompanyReviewForm = () => {
    const [form] = Form.useForm();
    const { idCompany } = useParams(); // <-- Lấy idCompany từ URL
    const [companyName, setCompanyName] = useState<string>('Đang tải...');
    const rateDescriptions = ["Rất tệ", "Cần cải thiện nhiều", "Trung lập", "Tốt", "Xuất sắc"];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleBackClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Tiếp tục đánh giá
    };

    const handleConfirmExit = () => {
        navigate(`/company/${idCompany}`); // Điều hướng về trang chi tiết công ty
    };


    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const res = await getAllCompany();
                const companyList = res?.data || []; // fallback nếu undefined

                const matchedCompany = companyList.find((c: any) => c._id === idCompany);
                setCompanyName(matchedCompany?.name || "Không rõ");
            } catch (error) {
                console.error("❌ Lỗi khi lấy thông tin công ty:", error);
                setCompanyName("Không rõ");
            }
        };
        if (idCompany) {
            fetchCompanyName();
        }
    }, [idCompany]);

    const handleSubmit = (values : any) => {
        console.log('Review Submitted:', values);
    };

    return (
        <div>
            <div className="review-header">
                <Button className='btn_submit' onClick={handleBackClick}><LeftOutlined />Quay lại</Button>
                <div className="header__logo" style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#fff",
                }}>
                    Job<span>IT</span>
                    <div style={{ width: 75 }} /> {/* chừa chỗ cân đối bên phải */}
                </div>

            </div>
            <div className="review-wrapper">


                <Card className="review-left">
                    <Title level={4}>Đánh giá cho {companyName}</Title>
                    <Text>
                        Bạn chỉ mất 1 phút để hoàn thành bảng đánh giá này. Ý kiến của bạn sẽ giúp ích rất nhiều cho cộng đồng Developer đang tìm việc.
                    </Text>

                    <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-6">
                        <Form.Item
                            name="overall"
                            label="Đánh giá chung"
                            rules={[{ required: true }]}
                            valuePropName="value"
                        >
                            <Rate tooltips={rateDescriptions} />
                        </Form.Item>

                        <Form.Item name="overall-title" validateTrigger="onBlur" rules={[{ required: true, message: "Thêm nội dung" }]}>
                            <Input placeholder="Tiêu đề" style={{ height: '56px', fontSize: '16px', marginBottom: "10px" }} />
                        </Form.Item>

                        <Form.Item
                            name="love"
                            label="Điều làm bạn thích làm việc tại đây"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: "Thêm nội dung" },
                                { min: 50, message: "Ít hơn 50 kí tự" },
                                { max: 10000, message: "Nhiều hơn 10000 kí tự" },
                            ]}
                        >
                            <TextArea rows={6} placeholder="Nhập nội dung" showCount maxLength={10000} />
                        </Form.Item>

                        <Form.Item
                            name="suggestion"
                            label="Đề nghị cải thiện"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: "Thêm nội dung" },
                                { min: 50, message: "Ít hơn 50 kí tự" },
                                { max: 10000, message: "Nhiều hơn 10000 kí tự" },
                            ]}
                        >
                            <TextArea rows={6} placeholder="Nhập nội dung" showCount maxLength={30000} />
                        </Form.Item>

                        

                        <Form.Item className="text-center mt-4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-btn"
                            >
                                Gửi đánh giá
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className="review-right">
                    <Title level={5}>Hướng dẫn và điều kiện về đánh giá</Title>
                    <Text>
                        Mọi đánh giá phải tuân thủ Hướng Dẫn & Điều Kiện về đánh giá để được hiển thị trên website
                    </Text>
                    <ul className="review-list">
                        <li><span className="dot"></span>Không sử dụng từ ngữ mang ý xúc phạm, miệt thị</li>
                        <li><span className="dot"></span>Không cung cấp thông tin cá nhân</li>
                        <li><span className="dot"></span>Không cung cấp thông tin bảo mật, bí mật kinh doanh của công ty</li>
                    </ul>

                    <div className="review-detail-link">
                        <Text className="info-text">
                            Cảm ơn bạn đã đưa ra những đánh giá chân thực nhất. Xem thêm thông tin chi tiết về Hướng Dẫn & Điều Kiện về đánh giá
                        </Text>
                        <a href="#" className="see-more-link">Xem chi tiết <ExportOutlined /></a>
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
                        </Button>
                    ]}
                >
                    <p>Tất cả thông tin đã nhập sẽ không được lưu lại. Bạn có chắc chắn muốn thoát khỏi trang này?</p>
                </Modal>
            </div>
        </div >
    );
};

export default CompanyReviewForm;
