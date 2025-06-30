import { Table, Tag, Space, Badge, Button } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ButtonDetailJob from "./ButtonDetailJob/ButtonDetailJob";
import ButtonDeleteJob from "./ButtonDeleteJob/ButtonDeleteJob";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchGetAllJobsByCompany } from "~/features/jobs.sclice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const columns: ColumnsType<any> = [
  {
    title: "Công việc",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Space>
        {record.logo && (
          <img
            src={record.logo}
            alt="logo"
            style={{
              width: 30,
              height: 30,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        )}
        <strong>{text}</strong>
      </Space>
    ),
  },

  {
    title: "Địa điểm",
    dataIndex: "locations",
    key: "locations",
    render: (locations: string[]) =>
      locations?.map((item) => <Tag color="blue">{item}</Tag>),
  },
  {
    title: "Mức lương",
    dataIndex: "salary",
    key: "salary",
    render: (s?: any) => (s ? `${s.min} - ${s.max} ${s.currency}` : "Không rõ"),
  },
  {
    title: "Cấp độ",
    dataIndex: "level",
    key: "level",
    render: (level: string) => <Tag color="purple">{level}</Tag>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Badge
        status={status === "Đang tuyển" ? "success" : "error"}
        text={status}
      />
    ),
  },
  {
    title: "Thao tác",
    key: "actions",
    render: (_, record) => (
      <Space>
        <ButtonDetailJob id={record._id} />
        <ButtonDeleteJob id={record._id} />
      </Space>
    ),
  },
];

function ListJobs() {
  const dispath = useAppDispatch();
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const decodeToken = token ? jwtDecode<any>(token) : null;
  const dataJobs = useAppSelector((state) => state.jobsReducer.jobs);
  useEffect(() => {
    const fetchApi = async () => {
      dispath(fetchGetAllJobsByCompany(decodeToken.idCompany));
    };
    fetchApi();
  }, []);
  return (
    <>
      <Button  style={{
        marginBottom : 10
      }}
      onClick={()=>{navigate("create")}}
      icon={<FaPlus/>}
      >Thêm công việc </Button>
      <Table
        columns={columns}
        rowKey="_id"
        bordered
        dataSource={dataJobs || []}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
export default ListJobs;
