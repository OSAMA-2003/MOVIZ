import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import { Provider } from 'react-redux';
import Store from './components/reduxStore/store/Store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
    </Provider>
  </StrictMode>
)
