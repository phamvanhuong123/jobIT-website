import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  Typography,
  message,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addCv } from "~/services/cv.axios";
import { useAppSelector } from "~/store";
import { uploadFile } from "~/utils/uploadFile";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ApplyForm = () => {
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.userCandidate.candidate);
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Title level={4}>Không tìm thấy thông tin công việc.</Title>
      </div>
    );
  }

  const jobLocations: string[] = Array.isArray(job?.rawData?.locations)
    ? [...new Set((job.rawData.locations as string[]).map((loc) => loc.trim()))]
    : [];

  const beforeUpload = (file: RcFile) => {
    if (file.size > 3 * 1024 * 1024) {
      message.error("File phải nhỏ hơn 3MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const onFinish = async (values: any) => {
    try {
      if (user?.idAccount) {
        values.cvUrl = await uploadFile(values.LinkCv[0].originFileObj);
        await addCv(user?.idAccount, job.id, values);
        navigate(-1);
        toast.success("Gửi CV thành công");
      }
    } catch (e) {
      toast.warning("Gửi CV thất bại");
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 32,
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        borderRadius: 12,
      }}
    >
      <Title level={4}>
        Ứng tuyển vào vị trí: {job?.title} tại {job?.company}
      </Title>

      <Divider />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="middle"
        requiredMark="optional"
      >
        {/* Upload CV */}
        <Form.Item
          label={<Text strong>CV ứng tuyển</Text>}
          name="LinkCv"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Vui lòng tải lên CV" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            maxCount={1}
            accept=".doc,.docx,.pdf"
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Chọn file CV (PDF/DOC)</Button>
          </Upload>
        </Form.Item>

        {/* Họ và Tên */}
        <Form.Item
          label={<Text strong>Họ và Tên</Text>}
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item
          label={<Text strong>Số điện thoại</Text>}
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="098xxxxxxx" />
        </Form.Item>

        {/* Nơi làm việc mong muốn */}
        <Form.Item
          label={<Text strong>Nơi làm việc mong muốn</Text>}
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
          <Select
            mode="multiple"
            placeholder="Chọn tối đa 3 địa điểm"
            allowClear
          >
            {jobLocations.map((loc: string) => (
              <Select.Option key={loc} value={loc}>
                {loc}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Thư xin việc */}
        <Form.Item
          label={<Text strong>Thư xin việc (Không bắt buộc)</Text>}
          name="coverLetter"
        >
          <TextArea
            rows={6}
            maxLength={500}
            showCount
            placeholder="Bạn có thể viết thư xin việc thể hiện động lực ứng tuyển..."
          />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Gửi CV của tôi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplyForm;
