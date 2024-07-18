import useBearStore from "@/store";
import { Avatar, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";

export default function Dashboard() {
  const userInfo = useBearStore(state => state.userInfo);
  console.log(userInfo);

  //状态转换列表
  const stateItem = (num?: number) => {
    if (!num) return "-";
    if (num === 1) return "在职";
    if (num === 2) return "离职";
    if (num === 3) return "试用期";
  };

  //描述列表
  const items: DescriptionsProps["items"] = [
    {
      key: "userName",
      label: "用户ID",
      children: userInfo.userName
    },
    {
      key: "userEmail",
      label: "邮箱",
      children: userInfo.userEmail
    },
    {
      key: "state",
      label: "状态",
      children: stateItem(userInfo.state)
    },
    {
      key: "mobile",
      label: "手机号",
      children: userInfo.mobile
    },
    {
      key: "job",
      label: "岗位",
      children: userInfo.job
    },
    {
      key: "deptName",
      label: "部门",
      children: userInfo.deptName
    }
  ];
  return (
    <div>
      <Avatar size={80} icon={<UserOutlined />} src={userInfo.userImg} />;
      <Descriptions title={`欢迎${userInfo.userName}同学,每日好心情`} items={items} />
    </div>
  );
}
