import { useState, useEffect, useContext } from "react";
import { Button } from "@blueprintjs/core";
import { SettingsContext } from "../context/settings";
import List from "../list/List";

export default function Pagination(props) {
  const settings = useContext(SettingsContext);
  let pagesArray = [];

  const [activePage, setActivePage] = useState(1);
  const [currentList, setCurrentList] = useState(settings.showCompleted === "true" ? props.list : props.incomplete);
  const [activeList, setActiveList] = useState(currentList.slice(0, settings.itemsPerPage));
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(currentList.length / settings.itemsPerPage));
  const [buttonsArray, setButtonsArray] = useState(pagesArray);

  useEffect(() => {
    setCurrentList(settings.showCompleted === "true" ? props.list : props.incomplete);
  }, [props.list, props.incomplete, settings.showCompleted]);

  useEffect(() => {
    setActiveList(currentList);
    setNumberOfPages(Math.ceil(currentList.length / settings.itemsPerPage));
  }, [currentList, settings.itemsPerPage]);

  useEffect(() => {
    if (numberOfPages) {
      pagesArray.push("Prev");

      for (let i = 1; i <= numberOfPages; i++) {
        pagesArray.push(i);
      }
      pagesArray.push("Next");
      setButtonsArray(pagesArray);
    }
  }, [numberOfPages]);

  useEffect(() => {
    let start = (activePage - 1) * settings.itemsPerPage;
    let end = start + Number(settings.itemsPerPage);
    setActiveList(currentList.slice(start, end));
  }, [activePage, settings.itemsPerPage, currentList]);

  useEffect(() => {
    if (activeList.length === 0 && currentList.length !== 0) {
      setActivePage(activePage - 1);
    }
  }, [activeList]);

  function handlePages(pageNumber) {
    if (pageNumber === "Prev" && buttonsArray.includes(activePage - 1)) {
      setActivePage(activePage - 1);
    } else if (pageNumber === "Next" && buttonsArray.includes(activePage + 1)) {
      setActivePage(activePage + 1);
    } else if (typeof pageNumber == "number") {
      setActivePage(pageNumber);
    }
  }

  return (
    <>
      <br />
      <List activeList={activeList} toggleComplete={props.toggleComplete} deleteItem={props.deleteItem} />
      <br />
      <div className="pag">
        {buttonsArray &&
          buttonsArray.map((item) => (
            <>
              <Button onClick={() => handlePages(item)} className="pagination-buttons">
                {item}
              </Button>
            </>
          ))}
      </div>
    </>
  );
}
