import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function List(props) {
  return (
    <Card className="mainItem2">
      <h3 className="list">Items List</h3>
      {props.activeList.map((item) => (
        <>
          <Card className="listCard" interactive={true} elevation={Elevation.THREE} key={item.id}>
            <h3>
              <b>{item.text}</b>
            </h3>
            <p>
              <b>Assigned to:</b> {item.assignee}
            </p>
            <p>
              <b>Difficulty:</b> {item.difficulty}
            </p>
            <Button onClick={() => props.deleteItem(item.id)} icon="cross" id="delete-btn"></Button>
            <Button onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete?.toString()}</Button>
          </Card>
          <br />
        </>
      ))}
    </Card>
  );
}
