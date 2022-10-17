import React from "react";

const List = <ListItem, >({
  items, render
}: {
  items: ListItem[]; 
  render: (item: ListItem) => React.ReactNode;
}) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

const GenericsTest = () => {
  return (
    <div>
      <List items={[1, 2, 4]} render={(item) => <div>{item}</div>}></List>
    </div>
  );
};