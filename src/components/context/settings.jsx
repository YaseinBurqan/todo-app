import React, { useState } from "react";

export const SettingsContext = React.createContext();

export default function Settings(props) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sortBy, setSortBy] = useState("difficulty");
  const [currentPage, setCurrentPage] = useState(1);

  const state = {
    showCompleted,
    itemsPerPage,
    sortBy,
    currentPage,

    setShowCompleted,
    setItemsPerPage,
    setSortBy,
    setCurrentPage,
  };

  return (
    <>
      <SettingsContext.Provider value={state}>{props.children}</SettingsContext.Provider>
    </>
  );
}
