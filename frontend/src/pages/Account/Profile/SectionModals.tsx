import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Col,
  Row,
  Checkbox,
} from "antd";
import { useEffect, useState } from "react";
import { BulbOutlined } from "@ant-design/icons";
import LanguageModal from "./Modal/LanguageModal";
import SkillModal from "./Modal/SkillModal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUpdateCandidate } from "~/features/candidate.slice";
import dayjs from "dayjs";

type SectionModalsProps = {
  openSection: number | null;
  onClose: () => void;
};

const modalTitles = [
  "Giới thiệu bản thân",
  "Học vấn",
  "Kinh nghiệm làm việc",
  "Kỹ năng",
  "Ngoại ngữ",
  "Dự án nổi bật",
  "Chứng chỉ",
  "Giải thưởng",
];

const SectionModals: React.FC<SectionModalsProps> = ({
  openSection,
  onClose,
}) => {
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.userCandidate.candidate);
  const dispatch = useAppDispatch();
  //Kĩ năng
  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const [skillsList, setSkillsList] = useState<
    { skill: string; experience: string }[]
  >([]);
  const [currentlyStudying, setCurrentlyStudying] = useState(false);

  // Ngoại ngữ
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [languagesList, setLanguagesList] = useState<
    { name: string; level: string }[]
  >([]);

  useEffect(() => {
    if (!openSection && form) {
      form.resetFields();
    }
    if(user){
      setLanguagesList(user?.languages)
    }
      
  }, [openSection]);

  useEffect(() => {
    setSkillModalVisible(openSection === 3);
    setLanguageModalVisible(openSection === 4);
  }, [openSection]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log(`Dữ liệu section [${modalTitles[openSection!]}]:`, values);
      if (user?.idAccount) {
        // Nếu form gửi là học vấn
        console.log(values);
        if (values.schoolName) {
          values.education = {
            schoolName: values.schoolName,
            major: values.major,
            isCurrentlyStudying: currentlyStudying,
            startDate: values.startDate?.toDate() ?? null,
            endDate: values.endDate?.toDate() ?? null,
            description: values.description || "",
          };
        }

        dispatch(fetchUpdateCandidate({ id: user.idAccount, body: values }))
          .unwrap()
          .then(() => {
            toast.success("Cật nhật thành công");
            onClose();
          })
          .catch((e) => {
            console.log("Lỗi ", e), toast.error("Cật nhật thất bại");
          });
      }
    });
  };

  // Khi modal ngoại ngữ đóng, đóng SectionModals luôn
  const handleCloseLanguageModal = () => {
    setLanguageModalVisible(false);
    onClose();
  };
  if (openSection === null) return null;

  if (openSection === 3) {
    return (
      <SkillModal
        visible={skillModalVisible}
        onClose={() => {
          setSkillModalVisible(false);
          onClose(); // đóng SectionModals luôn khi SkillModal đóng
        }}
        skillsList={skillsList}
        setSkillsList={setSkillsList}
        // Có thể truyền thêm props onSave nếu cần
      />
    );
  }
  if (openSection === 4) {
    return (
      <LanguageModal
        visible={languageModalVisible}
        onClose={handleCloseLanguageModal}
        languagesList={languagesList}
        setLanguagesList={setLanguagesList}
      />
    );
  }

  // Khi checkbox thay đổi
  const onCurrentlyStudyingChange = (e: any) => {
    setCurrentlyStudying(e.target.checked);
    if (e.target.checked) {
      // Nếu đang học, clear ngày "đến"
      form.setFieldsValue({ timeEnd: null });
    }
  };

  //Chèn mẫu
  const sampleProjectDescription = `Tên dự án | 01/2025 - 05/2025
    - Mô tả: Viết mô tả ngắn gọn dự án 
    - Vai trò: Chức danh của bạn trong dự án 
    - Trách nhiệm: 
        + Trách nhiệm đầu tiên 
        + Trách nhiệm thứ hai 
    - Công nghệ: Liệt kê các công nghệ đã sử dụng 
    - Nhóm: x thành viên`;

  const FeaturedProjectDescription = `- Mô tả: Viết mô tả ngắn gọn dự án 
    - Vai trò: Chức danh của bạn trong dự án 
    - Trách nhiệm: 
        + Trách nhiệm đầu tiên 
        + Trách nhiệm thứ hai 
    - Công nghệ: Liệt kê các công nghệ đã sử dụng 
    - Nhóm: x thành viên`;

  const renderFields = () => {
    switch (openSection) {
      case 0: // Giới thiệu
        return (
          <Form.Item label="Giới thiệu bản thân">
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ color: "#fa8c16", fontSize: 18 }}>
                <BulbOutlined style={{ color: "#fa8c16", fontSize: 18 }} />
              </span>
              <span>
                <strong>Tip:</strong> Tóm tắt kinh nghiệm chuyên môn, chú ý làm
                nổi bật các kỹ năng và điểm mạnh.
              </span>
            </div>
            <Form.Item
              name="about"
              rules={[
                {
                  max: 2500,
                  message: "Nội dung bạn đã viết vượt quá 2500 ký tự",
                },
              ]}
              style={{ marginBottom: 0 }}
              initialValue={user?.about}
            >
              <Input.TextArea
                rows={6}
                maxLength={2500}
                showCount
                style={{ resize: "none" }}
                placeholder="Nhập nội dung giới thiệu bản thân..."
              />
            </Form.Item>
          </Form.Item>
        );
      case 1: // Học vấn
        return (
          <>
            <Form.Item
              name="schoolName"
              label="Trường"
              validateTrigger="onBlur"
              initialValue={user?.education?.schoolName}
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên trường học của bạn",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="major"
              label="Ngành Học"
              validateTrigger="onBlur"
              initialValue={user?.education?.major}
              rules={[
                { required: true, message: "Vui lòng điền ngành học của bạn" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={currentlyStudying}
                onChange={onCurrentlyStudyingChange}
              >
                Tôi đang theo học tại đây
              </Checkbox>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="startDate"
                  label="Từ"
                  validateTrigger="onBlur"
                  initialValue={
                    user?.education?.startDate
                      ? dayjs(user.education.startDate)
                      : null
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mốc thời gian cụ thể",
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    format="MM/YYYY"
                    placeholder="Chọn tháng/năm"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="endDate"
                  label="Đến"
                  initialValue={
                    user?.education?.endDate
                      ? dayjs(user.education.endDate)
                      : null
                  }
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: !currentlyStudying,
                      message: "Vui lòng chọn mốc thời gian cụ thể",
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    format="MM/YYYY"
                    placeholder={
                      currentlyStudying ? "Đang học" : "Chọn tháng/năm"
                    }
                    disabled={currentlyStudying}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description">
              <Input.TextArea placeholder="Thông tin chi tiết khác" rows={3} />
            </Form.Item>

            <Form.Item></Form.Item>
          </>
        );
      case 2: // Kinh nghiệm làm việc
        return (
          <>
            <Form.Item
              name="company"
              label="Công ty"
              validateTrigger="onBlur"
              rules={[{ required: true, message: "Vui lòng điền tên công ty" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="position"
              label="Chức Danh"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Vui lòng điền chức danh của bạn" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Checkbox
                checked={currentlyStudying}
                onChange={onCurrentlyStudyingChange}
              >
                Tôi đang làm việc tại đây
              </Checkbox>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="timeStart"
                  label="Từ"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mốc thời gian cụ thể",
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    format="MM/YYYY"
                    placeholder="Chọn tháng/năm"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="timeEnd"
                  label="Đến"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: !currentlyStudying,
                      message: "Vui lòng chọn mốc thời gian cụ thể",
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    format="MM/YYYY"
                    placeholder={
                      currentlyStudying ? "Đang học" : "Chọn tháng/năm"
                    }
                    disabled={currentlyStudying}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              label="Mô tả chi tiết"
              rules={[
                {
                  max: 2500,
                  message:
                    "Nội dung trong mô tả chi tiết không được vượt quá 2500 ký tự",
                },
              ]}
            >
              <div
                style={{
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span style={{ color: "#fa8c16", fontSize: 18 }}>
                  <BulbOutlined style={{ color: "#fa8c16", fontSize: 18 }} />
                </span>
                <span>
                  <strong>Tip:</strong> Tóm lược lĩnh vực công ty bạn đã làm,
                  nêu các trách nhiệm và kết quả đạt được trong công việc. Sử
                  dụng phần "Dự án" bên dưới để mô tả dự án đã tham gia.
                </span>
              </div>
              <Input.TextArea
                rows={8}
                maxLength={2500}
                showCount={{
                  formatter: ({ count, maxLength }) =>
                    `Đã nhập ${count}/${maxLength} ký tự`,
                }}
              />
            </Form.Item>

            <Form.Item
              name="Project"
              label="Dự án"
              rules={[
                {
                  max: 2500,
                  message:
                    "Nội dung trong mô tả dự án không được vượt quá 2500 ký tự",
                },
              ]}
            >
              <Input.TextArea
                rows={8}
                maxLength={2500}
                showCount={{
                  formatter: ({ count, maxLength }) =>
                    `Đã nhập ${count}/${maxLength} ký tự`,
                }}
              />
            </Form.Item>
            <div style={{ marginBottom: 8 }}>
              <Button
                type="dashed"
                onClick={() => {
                  form.setFieldsValue({ Project: sampleProjectDescription });
                }}
              >
                Chèn mẫu sẵn
              </Button>
            </div>
          </>
        );
      case 3: // Kỹ năng
        return (
          <SkillModal
            visible={skillModalVisible}
            onClose={() => setSkillModalVisible(false)}
            skillsList={skillsList}
            setSkillsList={setSkillsList}
          />
        );
      case 4: // Ngoại ngữ
        return (
          <LanguageModal
            visible={languageModalVisible}
            onClose={() => setLanguageModalVisible(false)}
            languagesList={languagesList}
            setLanguagesList={setLanguagesList}
          />
        );
      case 5: // Dự án nổi bật
        return (
          <>
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ color: "#fa8c16", fontSize: 18 }}>
                <BulbOutlined style={{ color: "#fa8c16", fontSize: 18 }} />
              </span>
              <span>
                <strong>Tip:</strong>Thể hiện dự án liên quan đến kỹ năng và khả
                năng của bạn, và đảm bảo bao gồm mô tả dự án, vai trò của bạn,
                công nghệ sử dụng và số thành viên.
              </span>
            </div>
            <Form.Item
              name="projectName"
              label="Tên dự án"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Vui lòng điền tên dự án của bạn" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Checkbox
                checked={currentlyStudying}
                onChange={onCurrentlyStudyingChange}
              >
                Tôi vẫn đang làm dự án này
              </Checkbox>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="timeStart"
                  label="Ngày bắt đầu"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mốc thời gian cụ thể",
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    format="MM/YYYY"
                    placeholder="Chọn tháng/năm"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="timeEnd"
                  label="Ngày kết thúc"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: !currentlyStudying,
                      message: "Vui lòng chọn mốc thời gian cụ thể",
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    format="MM/YYYY"
                    placeholder={
                      currentlyStudying ? "Đang học" : "Chọn tháng/năm"
                    }
                    disabled={currentlyStudying}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="Project"
              label="Dự án"
              rules={[
                {
                  max: 2500,
                  message:
                    "Nội dung trong mô tả dự án không được vượt quá 2500 ký tự",
                },
              ]}
            >
              <Input.TextArea
                rows={8}
                maxLength={2500}
                showCount={{
                  formatter: ({ count, maxLength }) =>
                    `Đã nhập ${count}/${maxLength} ký tự`,
                }}
              />
            </Form.Item>
            <div style={{ marginBottom: 8 }}>
              <Button
                type="dashed"
                onClick={() => {
                  form.setFieldsValue({ Project: FeaturedProjectDescription });
                }}
              >
                Chèn mẫu sẵn
              </Button>
            </div>
            <Form.Item name="link-website">
              <Input placeholder="Đường dẫn website" />
            </Form.Item>
          </>
        );
      case 6: // Chứng chỉ
        return (
          <>
            <Form.Item
              name="certificateName"
              label="Tên chứng chỉ"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên chứng chỉ của bạn",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="organization"
              label="Tổ chức cấp"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên tổ chức phát hành chứng chỉ ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Ngày cấp"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Vui lòng chọn mốc thời gian" },
              ]}
            >
              <DatePicker
                picker="month"
                style={{ width: "100%" }}
                format="MM/YYYY"
                placeholder={currentlyStudying ? "Đang học" : "Chọn tháng/năm"}
                disabled={currentlyStudying}
              />
            </Form.Item>
            <Form.Item name="link-website">
              <Input placeholder="Link chứng chỉ" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả chi tiết"
              rules={[
                {
                  max: 2500,
                  message:
                    "Nội dung trong mô tả chi tiết không được vượt quá 2500 ký tự",
                },
              ]}
            >
              <Input.TextArea
                rows={8}
                maxLength={2500}
                showCount={{
                  formatter: ({ count, maxLength }) =>
                    `Đã nhập ${count}/${maxLength} ký tự`,
                }}
              />
            </Form.Item>
          </>
        );
      case 7: // Giải thưởng
        return (
          <>
            <Form.Item
              name="awardName"
              label="Tên giải thưởng"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng điền tên giải thưởng hoặc danh hiệu của bạn",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="org"
              label="Đơn vị trao thưởng"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng điền tên giải thưởng hoặc danh hiệu của bạn",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Ngày cấp"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Vui lòng chọn mốc thời gian" },
              ]}
            >
              <DatePicker
                picker="month"
                style={{ width: "100%" }}
                format="MM/YYYY"
                placeholder={currentlyStudying ? "Đang học" : "Chọn tháng/năm"}
                disabled={currentlyStudying}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả chi tiết"
              rules={[
                {
                  max: 2500,
                  message:
                    "Nội dung trong mô tả chi tiết không được vượt quá 2500 ký tự",
                },
              ]}
            >
              <div
                style={{
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span style={{ color: "#fa8c16", fontSize: 18 }}>
                  <BulbOutlined style={{ color: "#fa8c16", fontSize: 18 }} />
                </span>
                <span>
                  <strong>Tip:</strong>Mô tả ngắn gọn về giải thưởng hoặc lí do
                  đạt giải
                </span>
              </div>
              <Input.TextArea
                rows={8}
                maxLength={2500}
                showCount={{
                  formatter: ({ count, maxLength }) =>
                    `Đã nhập ${count}/${maxLength} ký tự`,
                }}
              />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={openSection !== null}
      title={modalTitles[openSection]}
      onCancel={onClose}
      onOk={handleSave}
      width={800}
      modalRender={(modal) => (
        <div style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: 16 }}>
          {modal}
        </div>
      )}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          style={{ backgroundColor: "#ff4d4f", borderColor: "#fa8c16" }}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {renderFields()}
      </Form>
    </Modal>
  );
};

export default SectionModals;
