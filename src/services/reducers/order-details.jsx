import { useDispatch } from "react-redux";
import { getOrder } from "../../components/api/api";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
} from "../actions/order-details";


//action creator
export const getOrderNumber = (ingredientsId) => {
  return function (dispatch) {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    getOrder(ingredientsId)
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          number: res.order.number
        });
      })
      .catch((err) => {
        console.error("Error in getOrderNumber()", err);
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
};

//начальное состояние
const initialState = {
  orderNumber: 0,
  isLoading: false,
  error: false,
};

//редьюсер
export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, number: action.number };
    case ORDER_DETAILS_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};