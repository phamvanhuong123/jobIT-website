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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router";
import { toast } from "react-toastify";
import { fetchUpdateJob } from "~/features/jobs.sclice";
import { detailJob } from "~/services/job.axios";
import { useAppDispatch } from "~/store";
const { Title } = Typography;
const { Option } = Select;
function DetailJobPage() {
  const params = useParams();
  const [form] = Form.useForm();
  const id = params.id;
  const [disabledForm,setDisabledForm] = useState(true)
  const dispatch = useAppDispatch()

  // sử lí sự kiện submit
  const handleSubmit = (body : IJob) =>{
    console.log(body)
    if (id)
    dispatch(fetchUpdateJob({id,body}))
    toast.success("Cật nhật thành công")
    setDisabledForm(true)
  }

  useEffect(() => {
    const fetchApi = async (id: String) => {
      const res = await detailJob(id);
      if (res.data) {
        form.setFieldsValue(res.data);
      }
    };
    if (id) fetchApi(id);
  }, []);
  return (
    <>
      <Row justify={'space-between'}>
        <Col >
          <Title level={3}>Chi tiết công việc</Title>
        </Col>
        <Col>
        <Button
            onClick={() => {
              setDisabledForm(!disabledForm);
            }}
          >
            {!disabledForm ? "Huỷ" : "Chỉnh sửa"}
          </Button>
        </Col>
      </Row>
      <Divider />
      <Form layout="vertical" form={form} disabled={disabledForm} onFinish={handleSubmit}>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Tên công việc" name="name">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Cấp độ" name="level">
              <Select
                placeholder="Cấp độ"
                options={[
                  {
                    label: "Fresher",
                    value: "Fresher",
                  },
                  {
                    label: "Junior",
                    value: "Junior",
                  },
                  {
                    label: "Middle",
                    value: "Middle",
                  },
                  {
                    label: "Senior",
                    value: "Senior",
                  },
                  {
                    label: "Lead/Manager",
                    value: "Lead/Manager",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Hình thức" name="workplace">
              <Select
                placeholder="Hình thức"
                options={[
                  {
                    label: "Remote",
                    value: "Remote",
                  },
                  {
                    label: "On-site",
                    value: "On-site",
                  },
                  {
                    label: "Hybrid",
                    value: "Hybrid",
                  },
                  {
                    label: "Flexible",
                    value: "Flexible",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Trạng thái" name="status">
              <Select
                placeholder="Hình thức"
                options={[
                  {
                    label: "Đang tuyển",
                    value: "Đang tuyển",
                  },
                  {
                    label: "Ngừng tuyển",
                    value: "Ngừng tuyển",
                  },
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
              <Select mode="tags" placeholder="Kĩ năng" />
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
          <Button type="primary" htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default DetailJobPage;
