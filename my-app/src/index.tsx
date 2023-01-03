import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <h1> Dougie sweeper </h1>
    <App/>
    <p>Thanks for playing</p>
  </React.StrictMode>
);
reportWebVitals();
