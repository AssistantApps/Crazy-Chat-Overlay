import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import './scss/index.scss';
import './scss/forty/main.scss';

const reactApp = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
ReactDOM.render(
  reactApp,
  document.getElementById('assistantapps-chat')
);

