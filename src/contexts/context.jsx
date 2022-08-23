import React from "react";
export const settingsContext = React.createContext();

export default function Settings(props) {
  const state = {
    itemsPerPage: 5,
    sort: "Ascending",
    show: true,
  };

  return <settingsContext.Provider value={state}>{props.children}</settingsContext.Provider>;
}
