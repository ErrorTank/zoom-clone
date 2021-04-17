import React from "react";
import ReactDOM from "react-dom";
import "./style/base.css";
import "./style/components.css";
import "./style/utilities.css";
import "./style/index.css";
import Okay from "./test";

const CC = () => {
  return (
    <>
      <div className="ok"><Okay/></div>
    </>
  );
};

ReactDOM.render(<CC />, document.getElementById("app"));
