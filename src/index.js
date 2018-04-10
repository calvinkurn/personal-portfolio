import React from "react";
import ReactDOM from "react-dom";
import App from "View/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
