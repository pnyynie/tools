import '@/assets/styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/views/App';
import store from '@/store';
import reportWebVitals from '@/reportWebVitals';
import { AlertProvider } from '@/components/Alert/AlertContext';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </AlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
