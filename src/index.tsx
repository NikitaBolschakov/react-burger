import ReactDOM from 'react-dom/client';
import './vendors/normalize.module.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import rootReducer from './services/reducers';
import thunk from 'redux-thunk';
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware, ActionCreator
} from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { TWsActions, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage, wsSendMessage, WS_CONNECTION_AUTH_START, WS_CONNECTION_START } from './services/actions/ws-actions';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { wsOrders, wsOrdersAuth } from './utils/constants';

export type TWsMiddleware = {
  wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_AUTH_START,
  wsSendMessage: ActionCreator<TWsActions>,
  onOpen: ActionCreator<TWsActions>,
  onClose: ActionCreator<TWsActions>,
  onError: ActionCreator<TWsActions>,
  onMessage: ActionCreator<TWsActions>,
}

const wsActions: TWsMiddleware = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage
};

const wsAuthActions: TWsMiddleware = {
  wsInit: WS_CONNECTION_AUTH_START,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

// Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsOrders, wsActions, false)),
  applyMiddleware(socketMiddleware(wsOrdersAuth, wsAuthActions, true))
);

// Инициализируем хранилище с помощью корневого редьюсера
export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();