import React from 'react';
import ReactDOM from 'react-dom';
import './components/reset.css'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import './components/App.css'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
