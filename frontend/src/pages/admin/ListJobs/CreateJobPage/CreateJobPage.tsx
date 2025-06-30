import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import { toast } from "react-toastify";
import { useAppDispatch } from "~/store";
import { fetchCreateJob } from "~/features/jobs.sclice"; // Thay thế action
import { jwtDecode } from "jwt-decode";
const { Title } = Typography;
const { Option } = Select;

function CreateJobPage() {
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");
  const decodeToken = token ? jwtDecode<any>(token) : null;
  const dispatch = useAppDispatch();
  const handleSubmit = (body: IJob) => {
    dispatch(fetchCreateJob({id : decodeToken.idCompany,body : body}))
      .unwrap()
      .then(() => {
        toast.success("Tạo công việc thành công");
        form.resetFields(); // reset sau khi thêm
      })
      .catch((e) => {
        console.log(e);
        toast.error("Tạo công việc thất bại");
      });
  };

  return (
    <>
      <Row justify={"space-between"}>
        <Col>
          <Title level={3}>Thêm công việc mới</Title>
        </Col>
      </Row>
      <Divider />
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item
              label="Tên công việc"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Cấp độ" name="level" rules={[{ required: true }]}>
              <Select
                placeholder="Cấp độ"
                options={[
                  { label: "Fresher", value: "Fresher" },
                  { label: "Junior", value: "Junior" },
                  { label: "Middle", value: "Middle" },
                  { label: "Senior", value: "Senior" },
                  { label: "Lead/Manager", value: "Lead/Manager" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Hình thức"
              name="workplace"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Hình thức"
                options={[
                  { label: "Remote", value: "Remote" },
                  { label: "On-site", value: "On-site" },
                  { label: "Hybrid", value: "Hybrid" },
                  { label: "Flexible", value: "Flexible" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Trạng thái"
                options={[
                  { label: "Đang tuyển", value: "Đang tuyển" },
                  { label: "Ngừng tuyển", value: "Ngừng tuyển" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Địa điểm" name="locations">
              <Select mode="tags" placeholder="Địa điểm" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Kỹ năng" name="skills">
              <Select mode="tags" placeholder="Kỹ năng" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Lương tối thiểu"
              name={["salary", "min"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mức lương tối thiểu",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Lương tối đa"
              name={["salary", "max"]}
              rules={[
                { required: true, message: "Vui lòng nhập mức lương tối đa" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Đơn vị tiền tệ"
              name={["salary", "currency"]}
              rules={[{ required: true, message: "Vui lòng chọn loại tiền" }]}
            >
              <Select>
                <Option value="USD">USD</Option>
                <Option value="VND">VND</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả công việc" name="jobDescription">
              <Select mode="tags" placeholder="Mô tả công việc" />
            </Form.Item>
          </Col>

          <Divider>Yêu cầu</Divider>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Bằng cấp" name={["requirements", "degree"]}>
                <Select mode="tags" placeholder="Danh sách bằng cấp" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Kỹ năng mềm"
                name={["requirements", "softSkills"]}
              >
                <Select mode="tags" placeholder="Kỹ năng mềm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Kỹ năng chuyên môn"
                name={["requirements", "technicalSkills"]}
              >
                <Select mode="tags" placeholder="Kỹ năng kỹ thuật" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Điểm cộng"
                name={["requirements", "advantages"]}
              >
                <Select mode="tags" placeholder="Điểm cộng nếu có" />
              </Form.Item>
            </Col>
          </Row>
        </Row>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm công việc
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateJobPage;
