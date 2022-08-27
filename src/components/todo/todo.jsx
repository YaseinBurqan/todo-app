import React, { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import useForm from "../../hooks/form.jsx";
import { SettingsContext } from "../context/settings";
import Pagination from "../pagination/Pagination";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";

export default function ToDo() {
  const settings = useContext(SettingsContext);

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    console.log("item", item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item._id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
  }, [incomplete.length, list, settings.showCompleted]);

  return (
    <>
      <div className="">
        <header>
          <h1>
            To Do List: {incomplete.length} items pending, and {list.length - incomplete.length} completed
          </h1>
        </header>

        <div className="mainCards">
          <Card className="mainItem">
            <h2>Add To Do Item</h2>

            <form onSubmit={handleSubmit}>
              <FormGroup helperText="" label="To Do Item" labelFor="text-input">
                <InputGroup id="text-input" placeholder="Assignment Details" onChange={handleChange} />
              </FormGroup>

              <FormGroup helperText="" label="Assigned To" labelFor="text-input">
                <InputGroup id="text-input" placeholder="Assignee Name" onChange={handleChange} />
              </FormGroup>

              <FormGroup helperText="" label="Difficulty" labelFor="text-input">
                <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
              </FormGroup>

              <label>
                <Button type="submit">Add Item</Button>
              </label>
            </form>
          </Card>

          <Pagination className="pagList-container" list={list} incomplete={incomplete} toggleComplete={toggleComplete}></Pagination>
        </div>
      </div>
    </>
  );
}
