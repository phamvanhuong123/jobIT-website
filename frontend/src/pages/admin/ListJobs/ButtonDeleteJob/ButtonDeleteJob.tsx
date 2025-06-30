import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { toast } from "react-toastify";
import { fetchdeletedJob } from "~/features/jobs.sclice";
import { useAppDispatch } from "~/store";

function ButtonDeleteJob({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  const handleDeleted = () => {
    if (id)
      dispatch(fetchdeletedJob(id))
        .unwrap()
        .then(() => {
          toast.success("Xoá thành công");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Xoá thất bại");
        });
  };
  return (
    <>
      <Tooltip title="Xoá">
        <Popconfirm
          title="Bạn chắc chắn muốn xoá công việc này?"
          okText="Xoá"
          cancelText="Huỷ"
          onConfirm={handleDeleted}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </>
  );
}
export default ButtonDeleteJob;
