import { getOrder } from "../../components/api/api";

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST' //ожидаем ответа
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS' //данные успешно получены
export const ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED' //произошла ошибка
export const RESET_NUMBER_IN_MODAL = 'RESET_NUMBER_IN_MODAL'

//action creator
export const getOrderNumber = (ingredientsId) => {
    return function (dispatch) {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      getOrder(ingredientsId)
        .then(res => 
          dispatch({
            type: ORDER_DETAILS_SUCCESS,
            number: res.order.number
          })
        )
        .catch((err) => {
          console.error("Error in getOrderNumber()", err);
          dispatch({
            type: ORDER_DETAILS_FAILED,
          });
        });
    };
  };