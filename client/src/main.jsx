import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import { ConfirmContextProvider } from './context/ConfirmContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConfirmContextProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </ConfirmContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
