import { Form, Input, Button, Upload, Select, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { useState } from "react";
import { useLocation } from "react-router";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ApplyForm = () => {
  const [form] = Form.useForm();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const location = useLocation();
  const job = location.state?.job;
  //  kích thước
  const beforeUpload = (file: RcFile) => {
    if (file.size > 3 * 1024 * 1024) {
      message.error("File phải nhỏ hơn 3MB!");
      return Upload.LIST_IGNORE;
    }
    // Tạo đường dẫn tạm thời để xem trước
    setFileUrl(URL.createObjectURL(file));
    return false; // ngăn upload tự động
  };

  const onFinish = (values: any) => {
    console.log("Dữ liệu đã submit:", {
      ...values,
      fileUrl,
    });
    message.success("Gửi CV thành công!");
  };
  console.log(job);
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Title level={4}>
        Ứng tuyển vào vị trí: {job.title} tại {job.company}
      </Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* CV Upload */}
        <Form.Item
          label="CV ứng tuyển"
          name="LinkCv"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList;
          }}
          rules={[{ required: true, message: "Vui lòng tải lên CV" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            maxCount={1}
            accept=".doc,.docx,.pdf"
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Chọn file</Button>
          </Upload>
        </Form.Item>

        {/* Họ và tên */}
        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="098xxxxxxx" />
        </Form.Item>

        {/* Nơi làm việc */}
        <Form.Item
          label="Nơi làm việc mong muốn"
          name="locations"
          rules={[
            { required: true, message: "Vui lòng chọn nơi làm việc" },
            {
              validator: (_, value) =>
                !value || value.length <= 3
                  ? Promise.resolve()
                  : Promise.reject(new Error("Chỉ chọn tối đa 3 địa điểm")),
            },
          ]}
        >
          <Select mode="multiple" placeholder="Chọn nơi làm việc">
            <Select.Option value="TP Hồ Chí Minh">TP Hồ Chí Minh</Select.Option>
            <Select.Option value="Hà Nội">Hà Nội</Select.Option>
            <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
            <Select.Option value="Bình Định">Bình Định</Select.Option>
          </Select>
        </Form.Item>

        {/* Thư xin việc */}
        <Form.Item label="Thư xin việc (Không bắt buộc)" name="coverLetter">
          <TextArea
            rows={6}
            maxLength={500}
            showCount
            placeholder="Viết thư xin việc..."
          />
        </Form.Item>

        {/* Nút Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi CV của tôi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplyForm;
