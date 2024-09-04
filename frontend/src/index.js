import React from 'react';
import ReactDOM from 'react-dom/client'; // Importez la nouvelle API de React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';

// Créez une racine avec la nouvelle API `createRoot`
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Utilisez la méthode `render` sur la racine nouvellement créée
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Pour les performances de l'application
reportWebVitals();
