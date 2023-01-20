import { TWsMessageResponce } from "../../utils/types";

//типизируем литеральными типами
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";

export const WS_CONNECTION_AUTH_START: "WS_CONNECTION_AUTH_START" = "WS_CONNECTION_AUTH_START";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';

export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

//типизация экшенов
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionAuthStart {
  readonly type: typeof WS_CONNECTION_AUTH_START;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWsMessageResponce;
} 

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: TWsMessageResponce;
} 

//объединяем интерфейсы в Union
export type TWsActions = 
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionAuthStart
  | IWsConnectionStart
  | IWsGetMessage
  | IWsSendMessage;

//генераторы экшенов
export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED,
});

export const wsConnectionAuthStart = (): IWsConnectionAuthStart => ({
    type: WS_CONNECTION_AUTH_START,
});

export const wsConnectionStart = (): IWsConnectionStart => ({
    type: WS_CONNECTION_START,
}); 

export const wsGetMessage = (message: TWsMessageResponce ): IWsGetMessage => ({
    type: WS_GET_MESSAGE,
    payload: message,
});

export const wsSendMessage = (message: TWsMessageResponce ): IWsSendMessage => ({
    type: WS_SEND_MESSAGE,
    payload: message,
});