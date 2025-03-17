import React, { createContext, useState } from 'react';
import Alert from './index';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (variant, message) => {
    setAlert({ variant, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert && <Alert variant={alert.variant} message={alert.message} onClose={closeAlert} />}
    </AlertContext.Provider>
  );
};
