import { Form, Input, Button, Upload, Select, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addCv } from "~/services/cv.axios";
import { useAppSelector } from "~/store";
import { uploadFile } from "~/utils/uploadFile";

const { TextArea } = Input;
const { Title } = Typography;

const ApplyForm = () => {
  const [form] = Form.useForm();
  const user = useAppSelector(state => state.userCandidate.candidate);
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  if (!job) {
    return <div>Không tìm thấy thông tin công việc.</div>;
  }

  // Danh sách location từ job
  const jobLocations: string[] = Array.isArray(job?.rawData?.locations)
    ? [...new Set((job.rawData.locations as string[]).map((loc) => loc.trim()))]
    : [];


  // Kiểm tra kích thước file
  const beforeUpload = (file: RcFile) => {
    if (file.size > 3 * 1024 * 1024) {
      message.error("File phải nhỏ hơn 3MB!");
      return Upload.LIST_IGNORE;
    }
    return false; // ngăn upload tự động
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
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Title level={4}>
        Ứng tuyển vào vị trí: {job?.title} tại {job?.company}
      </Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Upload CV */}
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

        {/* Họ và Tên */}
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

        {/* Nơi làm việc mong muốn */}
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
            {jobLocations.map((loc: string) => (
              <Select.Option key={loc} value={loc}>
                {loc}
              </Select.Option>
            ))}
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

        {/* Submit */}
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
