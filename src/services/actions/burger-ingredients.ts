import { TIngredient } from './../../utils/types';
import { getData } from "../../utils/api";
import { AppDispatch, AppThunk } from '../types';

//типизируем литеральными типами
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const SET_INGREDIENTS_MODAL_ACTIVE: "SET_INGREDIENTS_MODAL_ACTIVE" = "SET_INGREDIENTS_MODAL_ACTIVE";
export const SET_INGREDIENTS_MODAL_INACTIVE: "SET_INGREDIENTS_MODAL_INACTIVE" = "SET_INGREDIENTS_MODAL_INACTIVE";

export const SET_ORDER_MODAL_ACTIVE: "SET_ORDER_MODAL_ACTIVE" = "SET_ORDER_MODAL_ACTIVE";
export const SET_ORDER_MODAL_INACTIVE: "SET_ORDER_MODAL_INACTIVE" = "SET_ORDER_MODAL_INACTIVE";

//типизация экшенов
export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientItems: Array<TIngredient>;
}

export interface ISetIngredientsModalActive {
  readonly type: typeof SET_INGREDIENTS_MODAL_ACTIVE;
}

export interface ISetIngredientsModalInactive {
  readonly type: typeof SET_INGREDIENTS_MODAL_INACTIVE;
}

export interface ISetOrderModalActive {
  readonly type: typeof SET_ORDER_MODAL_ACTIVE;
}

export interface ISetOrderModalInactive {
  readonly type: typeof SET_ORDER_MODAL_INACTIVE;
}

//объединяем интерфейсы в Union
export type TBurgerIngredientsActions = 
  | IGetIngredientsRequest
  | IGetIngredientsFailed
  | IGetIngredientsSuccess
  | ISetIngredientsModalActive
  | ISetIngredientsModalInactive
  | ISetOrderModalActive
  | ISetOrderModalInactive;

//генераторы экшенов
export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST,
});  

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED,
});  

export const getIngredientsSuccess = (ingredientItems: Array<TIngredient>): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredientItems
});  

export const setIngredientsModalActive = (): ISetIngredientsModalActive => ({
  type: SET_INGREDIENTS_MODAL_ACTIVE,
});

export const setIngredientsModalInactive = (): ISetIngredientsModalInactive => ({
  type: SET_INGREDIENTS_MODAL_INACTIVE,
});

export const setOrderModalActive = (): ISetOrderModalActive => ({
  type: SET_ORDER_MODAL_ACTIVE,
});

export const setOrderModalInactive = (): ISetOrderModalInactive => ({
  type: SET_ORDER_MODAL_INACTIVE,
});


//thunk-функция
export const getBurgerIngredientsItems: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    //сначала отправляй диспатч с загрузкой
    dispatch(getIngredientsRequest());
    //теперь функция получения данных, если все хорошо отправляй диспатч с типом и данными
    getData()
      .then((res) => {
        dispatch(getIngredientsSuccess(res.data));
      })
      //если ошибка - выведи в консоль ее и отправь диспатч с типом 'ошибка'
      .catch((error) => {
        console.error("Error in getData()", error);
        dispatch(getIngredientsFailed());
      });
  };
};
