import { Middleware, MiddlewareAPI } from "redux";
import { TWsMiddleware } from "../..";
import { getCookie } from "../../utils/cookie";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (
  wsUrl: string, wsActions: TWsMiddleware, isAuth = false): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const token = getCookie("accessToken");
      if (type === wsInit) {
        socket = !isAuth
          ? new WebSocket(wsUrl)
          : new WebSocket(`${wsUrl}?token=${token}`);
      } else if (type === onClose && socket) {
        socket.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen(event));
        };

        socket.onerror = (event) => {
          dispatch(onError(event));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        socket.onclose = (event) => {
          dispatch(onClose(event));
        };

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
