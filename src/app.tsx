import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/style.css';

import { Hello } from "./components/Hello";

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <div className="bg"></div>
    </div>,
    document.getElementById("example")
);