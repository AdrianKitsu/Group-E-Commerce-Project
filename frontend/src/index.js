import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { SearchBarProvider } from "./contexts/searchBarContext";

ReactDOM.render(
  <React.StrictMode>
    <SearchBarProvider>
      <App />
    </SearchBarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
