import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions, isAuth = false) => {
    return (store) => {
        let socket = null;
    
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
              const orders = { ...payload };
              socket.send(JSON.stringify(orders));
            }
          }
          next(action);
        };
      };
    };