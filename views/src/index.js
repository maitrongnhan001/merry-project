import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CookiesProvider>
        <App/>
      </CookiesProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
