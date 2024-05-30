// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import { StateContextProvider } from './context/stateContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
