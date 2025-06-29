
import { Card, Col, Divider, Row } from "antd";

import { useEffect, useState } from "react";

import { getApplyCvByUser } from "~/services/cv.axios";
import { useAppSelector } from "~/store";
import JobApplyItem from "./JobApplyItem";

function MyApply() {
  const user = useAppSelector((state) => state.userCandidate.candidate);
  const [dataCvApply, setDataCvApply] = useState<AppliedCv[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      if (user?.idAccount) {
        const res = await getApplyCvByUser(user?.idAccount);
        if (res.data) setDataCvApply(res.data);
      }
    };
    fetchApi();
  }, [user]);
  return (
    <>
      <Card style={{ marginTop: 20 }}>
        <Row gutter={[10, 10]}>
          {dataCvApply.map((item) => (
            <Col span={24}>
              <JobApplyItem item={item} />
              <Divider />
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
export default MyApply;
