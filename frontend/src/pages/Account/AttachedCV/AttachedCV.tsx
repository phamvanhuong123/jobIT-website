import React, { useState } from 'react';
import {
    Upload,
    Button,
    Typography,
    Card,
    Space,
    Tooltip,
    Modal,
    Form,
    Input,
    Select,
} from 'antd';
import {
    UploadOutlined,
    FileTextOutlined,
    ExclamationCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';
import './AttachedCV.css';

const { Title, Text } = Typography;
const { Option } = Select;

const AttachedCV: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Form values:', values);
                setIsModalVisible(false);
            })
            .catch(info => {
                console.log('Validation Failed:', info);
            });
    };
    const [isGeneralInfoModalVisible, setIsGeneralInfoModalVisible] = useState(false);
    const showGeneralInfoModal = () => setIsGeneralInfoModalVisible(true);
    const handleGeneralInfoCancel = () => setIsGeneralInfoModalVisible(false);
    const handleGeneralInfoOk = () => {
        form.validateFields()
            .then(values => {
                console.log('General Info:', values);
                setIsGeneralInfoModalVisible(false);
            })
            .catch(info => {
                console.log('Validation Failed:', info);
            });
    };

    const [isCoverLetterModalVisible, setIsCoverLetterModalVisible] = useState(false);
    const showCoverLetterModal = () => setIsCoverLetterModalVisible(true);
    const handleCoverLetterCancel = () => setIsCoverLetterModalVisible(false);
    const handleCoverLetterOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Cover Letter:', values.coverLetter);
                setIsCoverLetterModalVisible(false);
            })
            .catch(info => {
                console.log('Validation Failed:', info);
            });
    };

    return (
        <div className="attached-cv-container">
            <Card className="attached-cv-card" variant="outlined">
                <Title level={3}>Quản lý CV</Title>
                <Text type="secondary">
                    Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm việc
                </Text>

                {/* Section: CV của bạn */}
                <Card className="cv-upload-card">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space align="start">
                            <FileTextOutlined className="upload-icon" />
                            <Text type="secondary">Bạn chưa đính kèm CV nào</Text>
                        </Space>

                        <Upload beforeUpload={() => false} showUploadList={false}>
                            <Button icon={<UploadOutlined />} type="primary" danger>
                                Tải CV lên
                            </Button>
                        </Upload>

                        <Text type="secondary" className="upload-note">
                            Hỗ trợ định dạng <strong>.doc</strong>, <strong>.docx</strong>, <strong>.pdf</strong>, dưới 3MB và không chứa mật khẩu bảo vệ
                        </Text>
                    </Space>
                </Card>

                {/* Thông tin cơ bản */}
                <Card
                    title="Thông tin cơ bản"
                    className="info-card"
                    extra={
                        <Tooltip title="Chỉnh sửa">
                            <EditOutlined className="edit-icon" onClick={showModal} />
                        </Tooltip>
                    }
                >
                    <div className="info-row">
                        <Text strong>Họ và Tên</Text>
                        <Text>Nguyễn Văn A</Text>
                    </div>
                    <div className="info-row">
                        <Text strong>Số điện thoại</Text>
                        <Space>
                            <ExclamationCircleOutlined className="warning-icon" />
                            <Text type="warning">Thêm thông tin</Text>
                        </Space>
                    </div>
                    <div className="info-row">
                        <Text strong>Nơi làm việc mong muốn</Text>
                        <Space>
                            <ExclamationCircleOutlined className="warning-icon" />
                            <Text type="warning">Thêm thông tin</Text>
                        </Space>
                    </div>
                </Card>
            </Card>

            {/* Thông tin chung */}
            <Card title="Thông tin chung" className="info-card"
                extra={
                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined className="edit-icon" onClick={showGeneralInfoModal} />
                    </Tooltip>
                }
            >
                <div className="info-row">
                    <Text strong>Tổng số năm kinh nghiệm</Text>
                    <Text type="secondary">Thêm thông tin</Text>
                </div>
                <div className="info-row">
                    <Text strong>Cấp bậc hiện tại</Text>
                    <Text type="secondary">Thêm thông tin</Text>
                </div>
                <div className="info-row">
                    <Text strong>Hình thức làm việc mong muốn</Text>
                    <Text type="secondary">Thêm thông tin</Text>
                </div>
            </Card>

            {/* Thư xin việc */}
            <Card
                title="Thư xin việc"
                className="info-card"
                extra={
                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined className="edit-icon" onClick={showCoverLetterModal} />
                    </Tooltip>
                }
            >
                <Text type="secondary">
                    Giới thiệu bản thân và lý do vì sao bạn sẽ là lựa chọn tuyển dụng tuyệt vời
                </Text>
            </Card>


            {/* Modal - Hoàn thành thông tin cơ bản */}
            <Modal
                open={isModalVisible}
                title="Hoàn thành thông tin cơ bản"
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Lưu"
                okButtonProps={{ danger: true }}
                width={1000}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Họ và Tên"
                        name="fullName"
                        validateTrigger="onBlur"
                        rules={[{ required: true, message: 'Đây là thông tin bắt buộc' }]}
                        initialValue="Nguyễn Văn A"
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        validateTrigger="onBlur"
                        rules={[
                            { required: true, message: 'Đây là thông tin bắt buộc' },
                            {
                                pattern: /^(0|\+84)[0-9]{9,10}$/,
                                message: 'Số điện thoại không hợp lệ',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Nơi làm việc mong muốn"
                        name="locations"
                        validateTrigger="onBlur"
                        rules={[{ required: true, message: 'Đây là thông tin bắt buộc' }]}
                        extra="0/3 địa điểm"
                    >
                        <Select mode="multiple" maxTagCount={3} placeholder="Chọn địa điểm">
                            <Option value="hanoi">Hà Nội</Option>
                            <Option value="hcm">TP. Hồ Chí Minh</Option>
                            <Option value="danang">Đà Nẵng</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal - Cập nhật thông tin chung */}
            <Modal
                open={isGeneralInfoModalVisible}
                title="Thông tin chung"
                onCancel={handleGeneralInfoCancel}
                onOk={handleGeneralInfoOk}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
                width={1000}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Tổng số năm kinh nghiệm"
                        name="experienceYears"
                        validateTrigger="onBlur"
                        rules={[{
                            required: true, message: 'Vui lòng chọn số năm kinh nghiệm của bạn.'
                        }]}
                    >
                        <Select placeholder="Chọn năm">
                            {Array.from({ length: 21 }, (_, i) => (
                                <Option key={i} value={i}>{i} năm</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Cấp bậc hiện tại"
                        name="currentLevel"
                        validateTrigger="onBlur"
                        rules={[{ required: true, message: 'Vui lòng chọn cấp bậc hiện tại của bạn.' }]}
                    >
                        <Select placeholder="Chọn cấp bậc">
                            <Option value="intern">Thực tập sinh</Option>
                            <Option value="junior">Junior</Option>
                            <Option value="mid">Middle</Option>
                            <Option value="senior">Senior</Option>
                            <Option value="lead">Lead</Option>
                            <Option value="manager">Manager</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Hình thức làm việc mong muốn"
                        name="workTypes"
                        validateTrigger="onBlur"
                        rules={[{
                            required: true, message: 'Vui lòng chọn hình thức làm việc bạn mong muốn.'
                        }]}
                    >
                        <Select mode="multiple" placeholder="Chọn hình thức">
                            <Option value="fulltime">Toàn thời gian</Option>
                            <Option value="parttime">Bán thời gian</Option>
                            <Option value="remote">Remote</Option>
                            <Option value="freelance">Freelance</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Lĩnh vực đã làm việc"
                        name="industries"
                        validateTrigger="onBlur"
                        rules={[{ required: true, message: 'Bắt buộc' }]}
                        extra="0/5 Lĩnh vực"
                    >
                        <Select mode="multiple" maxTagCount={5} placeholder="Chọn lĩnh vực">
                            <Option value="it">An Ninh Mạng</Option>
                            <Option value="education">AI, Blockchain và Dịch Vụ Deep Tech</Option>
                            <Option value="finance">Tài chính</Option>
                            <Option value="marketing">Marketing</Option>
                            <Option value="healthcare">Y tế</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Mức lương mong muốn (theo tháng)" required >
                        <Space.Compact >
                            <Form.Item name="desiredSalaryCurrency" noStyle initialValue="VND">
                                <Select style={{ width: '100px' }}>
                                    <Select.Option value="VND">VND</Select.Option>
                                    <Select.Option value="USD">USD</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="desiredSalaryFrom"
                                validateTrigger="onBlur"
                                rules={[{ required: true, message: "Vui lòng điền mức lương bạn mong muốn" }]}
                                style={{ width: '40%' }}
                            >
                                <Input placeholder="Từ" />
                            </Form.Item>

                            <Form.Item
                                name="desiredSalaryTo"
                                validateTrigger="onBlur"
                                rules={[{ required: true, message: "Vui lòng điền mức lương bạn mong muốn" }]}
                                style={{ width: '40%' }}
                            >
                                <Input placeholder="Đến" />
                            </Form.Item>
                        </Space.Compact >
                    </Form.Item>

                    <Form.Item label="Mức lương hiện tại (theo tháng)">
                        <Space.Compact>
                            <Form.Item name="currentSalaryCurrency" noStyle initialValue="VND">
                                <Select style={{ width: '100px' }}>
                                    <Select.Option value="VND">VND</Select.Option>
                                    <Select.Option value="USD">USD</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="currentSalary"
                                noStyle
                                rules={[{ required: true, message: "Vui lòng nhập mức lương hiện tại" }]}
                            >
                                <Input style={{ width: '80%' }} placeholder="Nhập mức lương" />
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal cho thư xin việc */}
            <Modal
                open={isCoverLetterModalVisible}
                title="Thư xin việc"
                onCancel={handleCoverLetterCancel}
                onOk={handleCoverLetterOk}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
                width={800}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name="coverLetter"
                        label="Gợi ý: Bắt đầu bằng việc mô tả những gì bạn có thể mang đến cho công việc và tại sao công việc này lại khiến bạn hứng thú"
                        validateTrigger="onBlur"
                        rules={[
                            { max: 500, message: 'Thư xin việc không được vượt quá 500 ký tự' },
                        ]}
                        initialValue="Giới thiệu bản thân và lý do vì sao bạn sẽ là lựa chọn tuyển dụng tuyệt vời"
                    >
                        <Input.TextArea
                            rows={8}
                            maxLength={500}
                            showCount={{
                                formatter: ({ count, maxLength }) => `Đã nhập ${count}/${maxLength} ký tự`,
                            }}
                            placeholder="Nhập thư xin việc của bạn..."
                        />
                    </Form.Item>

                </Form>
            </Modal>


        </div >
    );
};

export default AttachedCV;
