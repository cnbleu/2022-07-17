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
    let value = localStorage.getItem("yb_user_data");
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
    localStorage.setItem("yb_user_data", JSON.stringify([...userListData]));
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

  const swapIndex = (arry, idx1, idx2) => {
    arry[idx1] = arry.splice(idx2, 1, arry[idx1])[0];
    return arry;
  }

  const onMoveUp = (item, index) => {
    console.log(`onMoveUp: index: ${index}, item: ${item}`);
    if (index == 0) {
      return;
    }

    swapIndex(userListData, index, index - 1);
    setUserListData([...userListData]);
  }

  const onMoveDown = (item, index) => {
    console.log(`onMoveDown: index: ${index}, item: ${item}`);
    if (index >= userListData.length) {
      return;
    }

    swapIndex(userListData, index, index + 1);
    setUserListData([...userListData]);
  }

  const onCopy = (item, index) => {
    console.log(`onCopy: index: ${index}, item: ${item}`);
    const value = JSON.parse(JSON.stringify(item));
    value.id = null;
    handleSubmit(value, () => {
      alert("复制成功");
    })
  }

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
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onCopy={onCopy}
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
