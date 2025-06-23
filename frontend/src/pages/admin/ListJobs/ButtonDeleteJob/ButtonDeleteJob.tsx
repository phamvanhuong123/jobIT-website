import { DeleteOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Tooltip } from "antd"

function ButtonDeleteJob({id } : {id : String}){
    return <>
    <Tooltip title="Xoá">
            <Popconfirm
              title="Bạn chắc chắn muốn xoá công việc này?"
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={() => console.log("Xoá:",id)}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
    </>
}
export default ButtonDeleteJob