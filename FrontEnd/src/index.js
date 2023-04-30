import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/reset.css'
import './styles/fonts.css';
import './styles/variables.css';
import './styles/defaults.css';
import './styles/helpers.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);


