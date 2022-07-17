import React, { useState } from "react";
import { Button } from "@alifd/next";
import UserList from "./UserList";
import UserForm from "./UserForm";
const defaultUserInfo = {
  id: "",
  account: "",
  email: "",
  password: "",
  gender: "male",
  remarks: ""
};

export default function App() {
  const [userListData, setUserListData] = useState(() => {
    // 从localStorage读取用户数据
    let value = localStorage.getItem("yb_user_list_data");
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  });
  const [formVisible, setFormVisible] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState(() => defaultUserInfo);

  // 提交表单
  const handleSubmit = (values, callback) => {
    if (values.id) {
      // 编辑模式
      const index = userListData.findIndex((x) => x.id === values.id);
      userListData[index] = values;
      setUserListData([...userListData]);
    } else {
      // 新增操作
      // 模拟数据库的id
      values.id = Date.now();
      userListData.push(values);
      setUserListData([...userListData]);
    }
    // 保存用户数据到localStorage
    localStorage.setItem(
      "yb_user_list_data",
      JSON.stringify([...userListData])
    );
    setFormVisible(false);
    callback && callback();
  };

  // 删除一行信息
  const handleDeleteItem = (index) => {
    userListData.splice(index, 1);
    setUserListData([...userListData]);
  };

  // 点击添加用户按钮
  const handleAddUser = () => {
    setDefaultFormData(defaultUserInfo);
    setFormVisible(true);
  };

  // 编辑
  const handleEditItem = (item) => {
    setFormVisible(true);
    setDefaultFormData(item);
  };

  return (
    <div>
      {/* 添加按钮 */}
      <Button onClick={handleAddUser} type="primary">
        添加用户
      </Button>
      {/* 用户列表 */}
      <UserList
        listData={userListData}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
      />
      {/* 用户信息表单 */}
      {formVisible && (
        <UserForm
          defaultFormData={defaultFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
