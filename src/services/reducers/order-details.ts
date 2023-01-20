import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  RESET_NUMBER_IN_MODAL,
  TOrderDetailsActions,
} from "../actions/order-details";

//описание типа для initialState редьюсера
type TOrderDetailsState = {
  orderNumber: null | number,
  isLoading: boolean;
  error: boolean;
}

//начальное состояние
const initialState: TOrderDetailsState = {
  orderNumber: null,
  isLoading: false,
  error: false,
};

//редьюсер
export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, orderNumber: action.number };
    case ORDER_DETAILS_FAILED:
      return { ...state, error: true };
    case RESET_NUMBER_IN_MODAL:
      return { ...state, orderNumber: null };
    default:
      return state;
  }
};