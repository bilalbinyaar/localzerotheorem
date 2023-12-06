import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { ContextProvider } from "./ContextProvider";
import { PersistGate } from "redux-persist/integration/react";
import { useStateContext } from "../src/ContextProvider";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { database } from './firebase_config';
import { ref, onValue, set, getDatabase } from 'firebase/database';
import AdminApp from "./AdminApp";
const root = ReactDOM.createRoot(document.getElementById("root"));
const CheckView = () => {
  const { adminInvestorView,
    handleAdminInvestorView, checkLoginMain, authCheckLoginInvestor, authCheckLoginAdmin, link, setLink } = useStateContext(); // Use the hook to access state
  useEffect(() => {
    const starCountRef = ref(database, 'backend-api-link');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setLink(data.link)
      // console.log("Here is link for env -->", process.env.REACT_APP_API)
    });
  }, [])

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
