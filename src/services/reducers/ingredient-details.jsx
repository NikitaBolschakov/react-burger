import {
  RESET_INGREDIENT_IN_MODAL,
  SET_INGREDIENT_IN_MODAL,
} from "../actions/ingredient-details";

const initialState = {
  currentIngredient: {},
};

//если окно открыто добавить ингредиент, если закрыто убрать ингредиент
export const ingredientModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_IN_MODAL:
      return { ...state, currentIngredient: action.payload };
    case RESET_INGREDIENT_IN_MODAL:
      return { ...state, currentIngredient: {} };
    default:
      return state;
  }
};
