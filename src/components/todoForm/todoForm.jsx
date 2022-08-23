import React from "react";
import { Card, Button, FormGroup, InputGroup } from "@blueprintjs/core";

export default function ToDoForm({ handleSubmit, handleChange }) {
  return (
    <Card className="mainItem">
      <h3>Add To Do</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup labelFor="text-input" labelInfo="(required)">
          <label>To Do Item</label>
          <InputGroup onChange={handleChange} name="text" id="text-input" placeholder="ToDo Details" />
          <label>Assigned To</label>
          <InputGroup onChange={handleChange} name="assignee" id="text-input" placeholder="Assignee Name" />
          <div className="Difficulty">
            <label>Difficulty</label>
            <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
          </div>
          <div className="AddTodo">
            <Button className="button" type="submit">
              Add ToDo
            </Button>
          </div>
        </FormGroup>
      </form>
    </Card>
  );
}
