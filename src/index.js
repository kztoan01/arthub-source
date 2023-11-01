// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from "react";
import "./index.css";
import App from "./App";
import { render } from "react-dom";                 // add this

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);