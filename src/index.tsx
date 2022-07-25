import React from 'react';
import ReactDOM from 'react-dom/client';
import './vendors/normalize.module.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import rootReducer from './services/reducers';
import thunk from 'redux-thunk';
import {
  /*compose,*/
  legacy_createStore as createStore,
  /*applyMiddleware,*/
} from "redux";

/*declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
   }
}*/

/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));*/

// Инициализируем хранилище с помощью корневого редьюсера
const store = createStore(rootReducer/*, enhancer*/);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();