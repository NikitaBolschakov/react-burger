import { TIngredient } from "../../utils/types";
import {
  RESET_INGREDIENT_IN_MODAL,
  SET_INGREDIENT_IN_MODAL,
  TIngredientDetailsActions,
} from "../actions/ingredient-details";

//описание типа для initialState редьюсера
type TIngredientDetailsState = {
  currentIngredient: TIngredient | null;
}

const initialState: TIngredientDetailsState = {
  currentIngredient: null
};

//если окно открыто добавить ингредиент, если закрыто убрать ингредиент
export const ingredientModalReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case SET_INGREDIENT_IN_MODAL:
      return { ...state, currentIngredient: action.payload };
    case RESET_INGREDIENT_IN_MODAL:
      return { ...state, currentIngredient: null };
    default:
      return state;
  }
};
