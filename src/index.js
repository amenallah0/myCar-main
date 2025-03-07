import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { UserProvider } from './userContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </UserProvider>
);

reportWebVitals();
