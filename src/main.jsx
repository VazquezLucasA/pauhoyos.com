// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // estilos de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // iconos de Bootstrap 
import './styles/global.css'; // estilos de react-toastify
import './index.css'; // estilos globales si tenés

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
