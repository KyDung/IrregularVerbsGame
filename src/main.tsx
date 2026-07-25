/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { validateVerbDataset } from './utils/datasetValidator';
import { IRREGULAR_VERBS } from './data/verbsData';

// Perform dataset integrity check in development
if ((import.meta as any).env?.DEV) {
  validateVerbDataset(IRREGULAR_VERBS);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
