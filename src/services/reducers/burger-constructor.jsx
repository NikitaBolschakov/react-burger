import { ADD_BUN, ADD_INGREDIENT } from "../actions/burger-constructor";

const initialState = {
    //hardcore data
  currentIngredients: [],
  bun: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        currentIngredients: [...state.currentIngredients, action.payload],
      };
    case ADD_BUN:
      return { ...state, bun: [action.payload] };
    default:
      return state;
  }
};
