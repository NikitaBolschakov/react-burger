import { TIngredient } from "../../utils/types";

//типизируем литеральными типами
export const SET_INGREDIENT_IN_MODAL: "SET_INGREDIENT_IN_MODAL" = "SET_INGREDIENT_IN_MODAL"; 
export const RESET_INGREDIENT_IN_MODAL: "RESET_INGREDIENT_IN_MODAL" = "RESET_INGREDIENT_IN_MODAL"; 

//типизация экшенов
export interface ISetIngredientInModal {
    readonly type: typeof SET_INGREDIENT_IN_MODAL;
    readonly payload: TIngredient;
}

export interface IResetIngredientInModal {
    readonly type: typeof RESET_INGREDIENT_IN_MODAL;
}

//объединяем интерфейсы в Union
export type TIngredientDetailsActions = 
  | ISetIngredientInModal
  | IResetIngredientInModal;


//генераторы экшенов
export const setIngredientInModal = (payload: TIngredient ): ISetIngredientInModal => ({
    type: SET_INGREDIENT_IN_MODAL,
    payload
}); 

export const resetIngredientInModal = (): IResetIngredientInModal => ({
    type: RESET_INGREDIENT_IN_MODAL,
}); 