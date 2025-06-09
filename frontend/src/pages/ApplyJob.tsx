import {
    Form,
    Input,
    Button,
    Upload,
    Select,
    Typography,
    message,
    Checkbox,
    Space,
    CheckboxChangeEvent
} from 'antd';
import { BulbOutlined, FileTextOutlined, UploadOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { UploadChangeParam } from 'antd/es/upload';
import { RcFile, UploadFile } from 'antd/es/upload/interface';

import './ApplyForm.css';  // import CSS ở đây
import { useState } from 'react';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface ApplyFormValues {
    cv: UploadFile[];
    name: string;
    phone: string;
    locations: string[];
    coverLetter?: string;
}

function ApplyForm() {
    const [form] = Form.useForm();
    const location = useLocation();
    const job = location.state?.job;
    const [fileList] = useState<UploadFile[]>([]);
    const [uploadNewCV, setUploadNewCV] = useState(false);
    const handleFinish = (values: ApplyFormValues) => {
        console.log('Submitted values:', values);
        message.success('Gửi CV thành công!');
    };

    const handleUploadChange = (info: UploadChangeParam<UploadFile>) => {
        const file = info.file as UploadFile<RcFile>;
        if (file.size && file.size > 3 * 1024 * 1024) {
            message.error('File phải nhỏ hơn 3MB!');
        }
    };
    const onCheckboxChange = (e: CheckboxChangeEvent) => {
        setUploadNewCV(e.target.checked);
    };
    const [locations, setLocations] = useState<string[]>([]);

    const maxLocations = 3;
    const handleChange = (values: string[]) => {
        if (values.length <= maxLocations) {
            setLocations(values);
        }
    };
    return (
        <div className="apply-form-container">
            <Title level={4}>
                Ứng tuyển vào vị trí: {job ? job.title : 'Không xác định'} tại {job?.company}
            </Title>
            <Form<ApplyFormValues>
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item label="CV ứng tuyển" required className="upload-container">
                    <Checkbox
                        checked={uploadNewCV}
                        onChange={onCheckboxChange}
                        className="circle-checkbox"
                        style={{ marginTop: 12 }}
                    >
                        Tải lên CV mới
                    </Checkbox>
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        onChange={handleUploadChange}
                        fileList={fileList}
                        accept=".doc,.docx,.pdf"
                    >
                        {fileList.length === 0 && (
                            <Space align="start" style={{ marginTop: 8 }}>
                                <FileTextOutlined className="upload-icon" />
                                <Text type="secondary">Bạn chưa đính kèm CV nào</Text>
                            </Space>
                        )}
                        <Button icon={<UploadOutlined />}>Chọn file</Button>
                    </Upload>
                    <Text type="secondary" className="upload-note">
                        Hỗ trợ định dạng <strong>.doc</strong>, <strong>.docx</strong>, <strong>.pdf</strong>, dưới 3MB và không chứa mật khẩu bảo vệ
                    </Text>
                </Form.Item>

                <Form.Item
                    label="Họ và Tên"
                    name="name"
                    validateTrigger="onBlur"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    validateTrigger="onBlur"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nơi làm việc mong muốn"
                    name="locations"
                    validateTrigger="onBlur"
                    rules={[{ required: true, message: 'Vui lòng chọn nơi làm việc' }]}
                >
                    <Select
                        mode="multiple"
                        maxTagCount={3}
                        onChange={handleChange}
                        value={locations}
                        placeholder="Chọn nơi làm việc"
                    >
                        <Select.Option value="TP Hồ Chí Minh">TP Hồ Chí Minh</Select.Option>
                        <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                        <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
                        <Select.Option value="Bình Định">Bình Định</Select.Option>
                    </Select>
                </Form.Item>

                {/* Hiển thị số địa điểm đã chọn */}
                <Text type={locations.length === maxLocations ? 'danger' : 'secondary'}>
                    {locations.length} / {maxLocations} địa điểm đã chọn
                </Text>

                <Form.Item label="Thư xin việc (Không bắt buộc)" name="coverLetter">
                    <div
                        style={{
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                        }}
                    >
                        <BulbOutlined className="tip-icon" />
                        <span className="tip-text">
                            <strong>Tip:</strong> Những kĩ năng, dự án hay thành tựu nào chứng tỏ bạn là một
                            ứng viên tiềm năng cho vị trí ứng tuyển này
                        </span>
                    </div>
                    <TextArea
                        rows={8}
                        maxLength={500}
                        showCount={{
                            formatter: ({ count, maxLength }) => `Đã nhập ${count}/${maxLength} ký tự`,
                        }}
                        placeholder="Nêu nhiều ví dụ cụ thể để thư xin việc của bạn thuyết phục hơn..."
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Gửi CV của tôi
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
}

export default ApplyForm;
