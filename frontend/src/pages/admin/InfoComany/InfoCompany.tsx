import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Typography,
} from "antd";
import type { FormProps } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { detailCompany, updateCompany } from "~/services/company.axios";
const { TextArea } = Input;
const { Title } = Typography;
function InfoCompany() {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [data, setData] = useState<ICompany>();
  const token = localStorage.getItem("token");
  const decodeToken  = token ? jwtDecode<any>(token) : null;
  //  Sự kiện cật nhât thông tin
  const onHandleSubmit: FormProps<any>["onFinish"] = async (
    values: ICompany
  ) => {
    try{
      await updateCompany(data?._id, values);

      toast.success("Cật nhật thông tin thành công");
      setData({...values,_id : data?._id ? data._id : ""});
      setComponentDisabled(true);
    
    }
    catch{
      toast.error("Cật nhật thất bại")

    }
  
    
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await detailCompany(decodeToken.id);
      setData(res.data);
      form.setFieldsValue(res.data);
    };
    fetchApi();
  }, []);

  console.log(decodeToken)
  return (
    <>
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          <h3>Thông tin công ty</h3>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setComponentDisabled(!componentDisabled);
            }}
          >
            {!componentDisabled ? "Huỷ" : "Chỉnh sửa"}
          </Button>
        </Col>
        <Col span={24}>
          <Form
            layout="vertical"
            onFinish={onHandleSubmit}
            disabled={componentDisabled}
            form={form}
          >
            <Form.Item
              name="name"
              label="Tên công ty"
              rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
            >
              <Input placeholder="VD: Công ty TNHH ABC" />
            </Form.Item>

            <Form.Item name="logo" label="Logo công ty (URL)">
              <Input placeholder="https://example.com/logo.png" />
            </Form.Item>

            <Form.Item name="address" label="Địa chỉ">
              <Input />
            </Form.Item>

            <Title level={4}>Thông tin chung</Title>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item name={["infor", "model"]} label="Loại hình">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name={["infor", "industry"]} label="Ngành nghề">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={["infor", "country"]} label="Quốc gia">
                  <Select
                    options={[
                      { value: "Việt Nam", label: "Việt Nam" },
                      { value: "Nhật Bản", label: "Nhật Bản" },
                      { value: "Mỹ", label: "Mỹ" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={["infor", "workingDay"]} label="Ngày làm việc">
                  <Input placeholder="VD: T2 - T6" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["infor", "size"]}
                  label="Quy mô (số lượng nhân viên)"
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Title level={4}>Liên hệ</Title>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item name="contactEmail" label="Email liên hệ">
                  <Input type="email" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="contactPhone" label="Số điện thoại">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Title level={4}>Nội dung tuyển dụng</Title>
            <Form.Item name="keySkills" label="Kỹ năng chính">
              <Select
                mode="tags"
                tokenSeparators={[","]}
                placeholder="Nhập và nhấn Enter"
              />
            </Form.Item>

            <Form.Item name="description" label="Mô tả công ty">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item name="whyLove" label="Lý do yêu thích công ty">
              <Select
                mode="tags"
                tokenSeparators={[","]}
                placeholder="VD: Lương hấp dẫn, môi trường thân thiện..."
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu thông tin
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default InfoCompany;
