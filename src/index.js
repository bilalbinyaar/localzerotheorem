import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './ContextProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { useStateContext } from '../src/ContextProvider';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { database } from './firebase_config';
import { ref, onValue } from 'firebase/database';
import AdminApp from './AdminApp';
const root = ReactDOM.createRoot(document.getElementById('root'));
const CheckView = () => {
  const { authCheckLoginInvestor, authCheckLoginAdmin, link, setLink } =
    useStateContext();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const starCountRef = ref(database, 'backend-api-link');
    if (flag === false) {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setLink(data.link);
        // console.log('Here is link for env -->', data.link);
        if (data.link === false) {
          setFlag(false);
        } else {
          setFlag(true);
        }
      });
    }
    // eslint-disable-next-line
  }, [flag]);

  return link !== false ? (
    <div>
      {' '}
      {authCheckLoginAdmin === true || authCheckLoginInvestor === 'True' ? (
        <AdminApp />
      ) : (
        <App />
      )}
    </div>
  ) : null;
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
