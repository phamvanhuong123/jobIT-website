import React from 'react';
import { Upload, Button, Typography, Card, Space, Tooltip } from 'antd';
import {
    UploadOutlined,
    FileTextOutlined,
    ExclamationCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';
import './AttachedCV.css';

const { Title, Text } = Typography;

const AttachedCV: React.FC = () => {
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
                            <EditOutlined className="edit-icon" />
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
            <Card
                title="Thông tin chung"
                className="info-card"
                extra={
                    <Tooltip title="Chỉnh sửa">

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
                        <EditOutlined className="edit-icon" />
                    </Tooltip>
                }
            >
                <Text type="secondary">
                    Giới thiệu bản thân và lý do vì sao bạn sẽ là lựa chọn tuyển dụng tuyệt vời
                </Text>
            </Card>
        </div>
    );
};

export default AttachedCV;
