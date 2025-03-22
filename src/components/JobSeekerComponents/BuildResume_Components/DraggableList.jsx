import React, { useState, useEffect } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";

const DraggableList = ({ items, onChange }) => {
  const [list, setList] = useState(items);

  // If the items prop changes (e.g. profileData keys), update the list
  useEffect(() => {
    setList(items);
  }, [items]);

  const onSortEnd = (oldIndex, newIndex) => {
    const newList = arrayMoveImmutable(list, oldIndex, newIndex);
    setList(newList);
    onChange(newList);
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list flex flex-col"
      draggedItemClassName="dragged"
      lockAxis="y"
    >
      {list.map((item) => (
        <SortableItem key={item} style={{ display: "flex" }}>
          <div
            className="item p-2 my-1"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              height: 50,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item}
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default DraggableList;
