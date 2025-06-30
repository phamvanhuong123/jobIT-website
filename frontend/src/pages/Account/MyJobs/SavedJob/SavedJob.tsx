import { Card, Divider, Row } from "antd";
import "./style.css";

import { useEffect, useState } from "react";
import {  getAllFavoriteJobByCandidate } from "~/services/favoriteJob.axios";
import { useAppSelector } from "~/store";
import SavedJobItem from "./SavedJobItem";
function SavedJob() {
  const [data, setData] = useState<any[]>([]);
  const user = useAppSelector((state) => state.userCandidate.candidate);
 

  const onchangeDelete = (id : string)=>{
    const newData = data.filter(item => item._id != id);
    setData(newData)
  }
  useEffect(() => {
    const fetchApi = async () => {
      if (user) {
        const res = await getAllFavoriteJobByCandidate(user.idAccount);
        if (res.data) setData(res.data);
      }
    };
    fetchApi();
  }, [user]);
  return (
    <>
      <Card style={{ marginTop: 20 }}>
        <Row gutter={[10, 10]}>
            {data.map((item) => <SavedJobItem onchangeDelete={onchangeDelete} item={item}/>)}

          <Divider />
        
        </Row>
      </Card>
    </>
  );
}
export default SavedJob;
