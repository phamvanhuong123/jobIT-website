import { EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router";

function ButtonDetailJob({ id }: { id: String }) {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Xem chi tiết">
        <Button icon={<EyeOutlined />} onClick={()=>{navigate(`${id}`)}} />
      </Tooltip>

      
    </>
  );
}
export default ButtonDetailJob;
