import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import TodoList from "../todoList/todoList";
import { v4 as uuid } from "uuid";
import ToDoForm from "../todoForm/todoForm";

const ToDo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <div className="cardsContainer">
      <h1 id="h1">To Do Item: {incomplete.length} items pending </h1>
      <div className="cards">
        <ToDoForm handleChange={handleChange} handleSubmit={handleSubmit} />
        <TodoList complete={incomplete} list={list} toggleComplete={toggleComplete} />
      </div>
    </div>
  );
};

export default ToDo;
