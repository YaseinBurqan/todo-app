import React from "react";
import "./App.scss";
import ToDo from "./components/todo/todo";

import Settings from "./components/context/settings";

function App() {
  return (
    <>
      <div>
        <Settings>
          <ToDo />
        </Settings>
      </div>
    </>
  );
}

export default App;
