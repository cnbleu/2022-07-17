import React from "react";
export default function UserList(props) {
  const {
    listData,
    onDeleteItem,
    onEditItem,
    onMoveUp,
    onMoveDown,
    onCopy
  } = props;
  // Action 删除
  const handleDelete = (index) => {
    onDeleteItem && onDeleteItem(index);
  };
  // Action上移
  const handleUp = (item, index) => {
    onMoveUp && onMoveUp(item, index);
  };
  // Action下移
  const handleDown = (item, index) => {
    onMoveDown && onMoveDown(item, index);
  };
  // Action 复制
  const handleCopy = (item, index) => {
    onCopy && onCopy(item);
  };
  // Action编辑
  const handleEdit = (item) => {
    onEditItem(item);
  };

  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 10,
        borderColor: "blue",
        padding: 10
      }}
    >
      {listData &&
        listData.map((item, i) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "14px",
                lineHeight: "19px"
              }}
            >
              <div>
                {item.id} | {item.email} | {item.account} | {item.gender} |{" "}
                {item.remarks}
              </div>
              <div>
                <span
                  onClick={handleDelete(item, i)}
                  style={{ color: "red", marginLeft: 10 }}
                >
                  [删除]
                </span>
                <span
                  style={{ marginLeft: 10 }}
                  onClick={() => handleEdit(item)}
                >
                  [编辑]
                </span>
                <span
                  onClick={() => handleUp(item, i)}
                  style={{ marginLeft: 10 }}
                >
                  [上移]
                </span>
                <span
                  onClick={() => handleDown(item, i)}
                  style={{ marginLeft: 10 }}
                >
                  [下移]
                </span>
                <span
                  onClick={() => handleCopy(item, i)}
                  style={{ marginLeft: 10 }}
                >
                  [复制]
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
