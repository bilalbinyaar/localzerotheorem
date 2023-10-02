import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { ContextProvider } from "./ContextProvider";
import { PersistGate } from "redux-persist/integration/react";
import { useStateContext } from "../src/ContextProvider";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import AdminApp from "./AdminApp";
const root = ReactDOM.createRoot(document.getElementById("root"));
const CheckView = () => {
  const { adminInvestorView,
    handleAdminInvestorView, checkLoginMain, authCheckLoginInvestor, authCheckLoginAdmin } = useStateContext(); // Use the hook to access state

  // Now you can use authCheckLoginInvestor in your component
  // For example, you can log it to the console
  // console.log(adminInvestorView);

  return (
    // Your component JSX here
    < div > {authCheckLoginAdmin === true || authCheckLoginInvestor === "True" ? <AdminApp /> : <App />}</div >

  );
};
root.render(
  <Provider store={store}>
    <ContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <CheckView />
          </PersistGate>
        </BrowserRouter>
      </React.StrictMode>
    </ContextProvider>
  </Provider>
);
