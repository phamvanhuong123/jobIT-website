import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store";
import { Table, Tag, Button, Tooltip, Select, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FilePdfOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

import dayjs from "dayjs";
import { getCvByJob, updateCv } from "~/services/cv.axios";
import { jwtDecode } from "jwt-decode";
import { fetchGetAllJobsByCompany } from "~/features/jobs.sclice";
import { toast } from "react-toastify";

function ListCv() {
  const token = localStorage.getItem("token");
  const decodeToken = token ? jwtDecode<any>(token) : null;
  const dataJobs = useAppSelector((state) => state.jobsReducer.jobs);
  const dispath = useAppDispatch();
  const [data, setData] = useState<Applicant[]>([]);

  const handleChangeStatus =async (id: string, newStatus: string) => {
    
    try {
    await updateCv(id,{status : newStatus})
    const updatedData = data.map((item) =>
      item._id === id ? { ...item, status: newStatus } : item
    );
      setData(updatedData);
      toast.success(`Đã cập nhật trạng thái thành "${newStatus}"`);
    } catch {
        toast.error("Cật nhật trạng thái thất bại")
    }
  };
  const columns: ColumnsType<Applicant> = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa điểm",
      dataIndex: "locations",
      key: "locations",
      render: (locations: string[]) =>
        locations.map((loc, i) => <Tag key={i}>{loc}</Tag>),
    },
    {
      title: "Công ty ứng tuyển",
      dataIndex: "nameJob",
      key: "nameJob",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={
            status == "pending"
              ? "🕒 Chờ duyệt"
              : status == "accepted"
              ? "✅ Chấp nhận"
              : "❌ Từ chối"
          }
          style={{ width: 120 }}
          onChange={(value) => handleChangeStatus(record._id, value)}
        >
          <Option value="pending">🕒 Chờ duyệt</Option>
          <Option value="accepted">✅ Chấp nhận</Option>
          <Option value="rejected">❌ Từ chối</Option>
        </Select>
      ),
    },
    {
      title: "Đã đọc?",
      dataIndex: "isRead",
      key: "isRead",
      render: (isRead: boolean) =>
        isRead ? (
          <Tag icon={<EyeOutlined />} color="green">
            Đã đọc
          </Tag>
        ) : (
          <Tag icon={<EyeInvisibleOutlined />} color="default">
            Chưa đọc
          </Tag>
        ),
    },
    {
      title: "Ngày nộp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "CV",
      dataIndex: "cvUrl",
      key: "cvUrl",
      render: (url: string) => (
        <Tooltip title="Xem CV ứng viên">
          <Button
            icon={<FilePdfOutlined />}
            type="primary"
            href={url}
            target="_blank"
          >
            CV
          </Button>
        </Tooltip>
      ),
    },
  ];
  useEffect(() => {
    if (dataJobs?.length === 0) {
      dispath(fetchGetAllJobsByCompany(decodeToken.idCompany));
    }
    const idsArr = dataJobs?.map((item) => item._id);
    const fetchApi = async () => {
      if (idsArr) {
        const response = await getCvByJob(idsArr?.toString());
        if (response.data) setData(response.data);
      }
    };
    fetchApi();
  }, [dataJobs]);
  console.log(data[0]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        }}
      />
    </>
  );
}
export default ListCv;
