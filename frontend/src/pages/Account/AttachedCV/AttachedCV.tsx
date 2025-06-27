import React, { use, useState } from "react";
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
} from "antd";
import {
  UploadOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./AttachedCV.css";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUpdateCandidate } from "~/features/candidate.slice";
import { ICandidate } from "~/types/candidate";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
const { Option } = Select;

const AttachedCV: React.FC = () => {
  const user = useAppSelector((state) => state.userCandidate.candidate);
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleOk = () => {
    form
      .validateFields()
      .then((values: ICandidate) => {
        console.log("Form values:", values);
        // Thực hiện cật nhật
        if (user?.idAccount) {
          dispatch(fetchUpdateCandidate({ id: user.idAccount, body: values }))
            .unwrap()
            .then(() => {
              toast.success("Cật nhật thành công");
            })
            .catch((e) => {
              console.log("Lỗi ", e), toast.error("Cật nhật thất bại");
            });
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };
  const [isGeneralInfoModalVisible, setIsGeneralInfoModalVisible] =
    useState(false);
  const showGeneralInfoModal = () => setIsGeneralInfoModalVisible(true);
  const handleGeneralInfoCancel = () => setIsGeneralInfoModalVisible(false);

  const handleGeneralInfoOk = () => {
    form
      .validateFields()
      .then((values: ICandidate) => {
        console.log("General Info:", values);
        // Thực hiện cật nhật
        if (user?.idAccount) {
          dispatch(fetchUpdateCandidate({ id: user.idAccount, body: values }))
            .unwrap()
            .then(() => {
              toast.success("Cật nhật thành công");
            })
            .catch((e) => {
              console.log("Lỗi ", e), toast.error("Cật nhật thất bại");
            });
        }
        setIsGeneralInfoModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <div className="attached-cv-container">
      <Card className="attached-cv-card" variant="outlined">
        <Title level={3}>Quản lý CV</Title>
        <Text type="secondary">
          Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm
          việc
        </Text>

        {/* Section: CV của bạn */}
        <Card className="cv-upload-card">
          <Space direction="vertical" style={{ width: "100%" }}>
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
              Hỗ trợ định dạng <strong>.doc</strong>, <strong>.docx</strong>,{" "}
              <strong>.pdf</strong>, dưới 3MB và không chứa mật khẩu bảo vệ
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
            <Text>{user?.fullName}</Text>
          </div>
          <div className="info-row">
            <Text strong>Số điện thoại</Text>
            <Space>
              {!user?.phoneNumber && (
                <ExclamationCircleOutlined className="warning-icon" />
              )}
              <Text type={user?.phoneNumber ? "success" : "warning"}>
                {user?.phoneNumber ? user.phoneNumber : "Thêm thông tin"}
              </Text>
            </Space>
          </div>
          <div className="info-row">
            <Text strong>Nơi làm việc mong muốn</Text>
            <Space>
              {!user?.locations && (
                <ExclamationCircleOutlined className="warning-icon" />
              )}
              <Text type={user?.locations ? "success" : "warning"}>
                {user?.locations ? user.locations.join(", ") : "Thêm thông tin"}
              </Text>
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
            <EditOutlined
              className="edit-icon"
              onClick={showGeneralInfoModal}
            />
          </Tooltip>
        }
      >
        <div className="info-row">
          <Text strong>Tổng số năm kinh nghiệm</Text>
          <Text type={user?.experienceYears ? "success" : "warning"}>
            {user?.experienceYears
              ? user.experienceYears.toString()
              : "Them thong tin"}
          </Text>
        </div>
        <div className="info-row">
          <Text strong>Cấp bậc hiện tại</Text>
          <Text type={user?.currentLevel ? "success" : "warning"}>
            {user?.currentLevel ? user.currentLevel : "Them thong tin"}
          </Text>
        </div>
        <div className="info-row">
          <Text strong>Hình thức làm việc mong muốn</Text>
          <Text type={user?.workTypes ? "success" : "warning"}>
            {user?.workTypes ? user.workTypes.toString() : "Them thong tin"}
          </Text>
        </div>
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
            rules={[{ required: true, message: "Đây là thông tin bắt buộc" }]}
            initialValue={user?.fullName}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            validateTrigger="onBlur"
            initialValue={user?.phoneNumber}
            rules={[
              { required: true, message: "Đây là thông tin bắt buộc" },
              {
                pattern: /^(0|\+84)[0-9]{9,10}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Nơi làm việc mong muốn"
            name="locations"
            validateTrigger="onBlur"
            initialValue={user?.locations}
            rules={[{ required: true, message: "Đây là thông tin bắt buộc" }]}
            extra="0/3 địa điểm"
          >
            <Select mode="multiple" maxTagCount={3} placeholder="Chọn địa điểm">
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
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
            initialValue={user?.experienceYears}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn số năm kinh nghiệm của bạn.",
              },
            ]}
          >
            <Select placeholder="Chọn năm">
              {Array.from({ length: 10 }, (_, i) => (
                <Option key={i} value={i}>
                  {i} Năm
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Cấp bậc hiện tại"
            name="currentLevel"
            validateTrigger="onBlur"
            initialValue={user?.currentLevel}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn cấp bậc hiện tại của bạn.",
              },
            ]}
          >
            <Select placeholder="Chọn cấp bậc">
              <Option value="Intern">Thực tập sinh</Option>
              <Option value="Junior">Junior</Option>
              <Option value="Mid">Middle</Option>
              <Option value="Senior">Senior</Option>
              <Option value="Lead">Lead</Option>
              <Option value="Manager">Manager</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Hình thức làm việc mong muốn"
            name="workTypes"
            validateTrigger="onBlur"
            initialValue={user?.workTypes}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hình thức làm việc bạn mong muốn.",
              },
            ]}
          >
            <Select mode="multiple" placeholder="Chọn hình thức">
              <Option value="Fulltime">Toàn thời gian</Option>
              <Option value="Parttime">Bán thời gian</Option>
              <Option value="Remote">Làm việc từ xa</Option>
              <Option value="Hybrid">Kết hợp (Remote + Văn phòng)</Option>
              <Option value="Onsite">Tại văn phòng</Option>
          
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttachedCV;
