import {  Tabs } from "antd";
import type { TabsProps } from "antd";
import SavedJob from "./SavedJob/SavedJob";
function MyJobs() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đã ứng tuyển",
        children : 'danh sahcs 3'

    },
    {
        key: '2',
        label : 'Đã lưu',
        children : <SavedJob/>
    },
    {
        key : '3',
        label : 'Xem gần đây',
        children : 'danh sahcs 2'

    }
  ];
  const renderTabBar: TabsProps['renderTabBar'] = (props,DefaultTabBar) =>(
    <div style={{backgroundColor : 'white',padding : 12,borderRadius : 10, height :100}}>
        <h3>Việc làm của tôi</h3>
        <DefaultTabBar {...props} style={{height : 63}} />
    </div>
  )

  return <>
   
        <Tabs items={items} renderTabBar={renderTabBar} />
    
  
  </>;
}
export default MyJobs;
