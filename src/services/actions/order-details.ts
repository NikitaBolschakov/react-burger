import { getOrder } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import { clearConstructor } from "./burger-constructor";

//типизируем литеральными типами
export const ORDER_DETAILS_REQUEST: "ORDER_DETAILS_REQUEST" = "ORDER_DETAILS_REQUEST"; //ожидаем ответа
export const ORDER_DETAILS_SUCCESS: "ORDER_DETAILS_SUCCESS" = "ORDER_DETAILS_SUCCESS"; //данные успешно получены
export const ORDER_DETAILS_FAILED: "ORDER_DETAILS_FAILED" = "ORDER_DETAILS_FAILED"; //произошла ошибка
export const RESET_NUMBER_IN_MODAL: "RESET_NUMBER_IN_MODAL" = "RESET_NUMBER_IN_MODAL";

//типизация экшенов
export interface IOrderDetailsRequest {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly number: number;
}

export interface IOrderDetailsFailed {
  readonly type: typeof ORDER_DETAILS_FAILED;
}

export interface IResetNumberInModal {
  readonly type: typeof RESET_NUMBER_IN_MODAL;
}

//объединяем интерфейсы в Union
export type TOrderDetailsActions = 
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFailed
  | IResetNumberInModal;

//генераторы экшенов
export const orderDetailsRequest = (): IOrderDetailsRequest => ({
  type: ORDER_DETAILS_REQUEST,
}); 

export const orderDetailsSuccess = (number: number): IOrderDetailsSuccess => ({
  type: ORDER_DETAILS_SUCCESS,
  number
}); 

export const orderDetailsFailed = (): IOrderDetailsFailed => ({
  type: ORDER_DETAILS_FAILED,
}); 

export const resetNumberInModal = (): IResetNumberInModal => ({
  type: RESET_NUMBER_IN_MODAL,
}); 



//action creator
export const getOrderNumber: AppThunk = (ingredientsId: Array<string>) => {
  return function (dispatch: AppDispatch ) {
    dispatch(orderDetailsRequest());
    getOrder(ingredientsId)
      .then((res) => (
        dispatch(orderDetailsSuccess(res.order.number)),
        dispatch(clearConstructor())
      ))
      .catch((err) => {
        console.error("Error in getOrderNumber()", err);
        dispatch(orderDetailsFailed());
      });
  };
};
