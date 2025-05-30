
import "./style.css";
import { Row } from "antd";

import InforUser from "./InforUser";
import MyAttachedCV from "./MyAttachedCV";
import MyActive from "./MyActive";


function Overview() {
  return (
    <>
      <Row gutter={[0, 15]}>
        <InforUser/>
        <MyAttachedCV/>
        <MyActive/>
      </Row>
    </>
  );
}
export default Overview;
