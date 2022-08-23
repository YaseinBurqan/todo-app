import React, { useContext, useState, useEffect } from "react";
import { settingsContext } from "../../contexts/context";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function TodoList(props) {
  const settings = useContext(settingsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeList, setActiveList] = useState((settings.show ? props.list : props.incomplete).slice(0, settings.itemsPerPage));
  const [pages, setPages] = useState(Math.ceil(props.list.length / settings.itemsPerPage));

  const changePage = (numberOfPage) => {
    if (numberOfPage !== currentPage) setCurrentPage(numberOfPage);
    console.log(currentPage);
  };

  const Pages = () => {
    let pageArray = [];
    if (currentPage > 1) {
      pageArray.push(
        <Button
          rightIcon="arrow-left"
          intent="success"
          text="previous"
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          previous
        </Button>
      );
    }

    for (let i = 1; i <= pages; i++) {
      pageArray.push(
        <Button
          type="button"
          onClick={() => {
            changePage(i);
          }}
          key={i}
        >
          {i}
        </Button>
      );
    }

    if (currentPage <= pages) {
      pageArray.push(
        <Button
          rightIcon="arrow-right"
          intent="success"
          text="Next"
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          next
        </Button>
      );
    }

    return <div className="pageButtons"> {pageArray} </div>;
  };

  return (
    <div>
      <Card className="mainCard">
        <h4 className="todoList">ToDo List</h4>
        {activeList.map((item) => (
          <Card className="listCard" interactive={true} elevation={Elevation.FIVE} key={item.id}>
            <h4>{item.text}</h4>
            <p>Assigned to : {item.assignee}</p>
            <p>Difficulty : {item.difficulty}</p>
            <Button class="bp4-button" type="button" className={item.complete ? "complete" : "notComplete"} onClick={() => props.toggleComplete(item.id)}>
              Complete : {item.complete.toString()}
            </Button>
          </Card>
        ))}
      </Card>
      <Pages />
    </div>
  );
}
