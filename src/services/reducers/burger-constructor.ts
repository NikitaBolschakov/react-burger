import { TIngredient } from "../../utils/types";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_ELEMENT,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";

//описание типа для initialState редьюсера
type TBurgerConstructorState = {
  currentIngredients: Array<TIngredient>;
  currentBun: Array<TIngredient>;
}

const initialState: TBurgerConstructorState = {
  currentIngredients: [],
  currentBun: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        currentIngredients: [...state.currentIngredients, action.payload],
      };
    case ADD_BUN:
      return { 
        ...state, 
        currentBun: [action.payload],
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].filter(
          (ingredient) => ingredient.id !== action.id
        ),
      };
    case MOVE_ELEMENT: {
      const dragContainer = [...state.currentIngredients];
      dragContainer.splice(
        action.payload.dragIndex,
        0,
        dragContainer.splice(action.payload.hoverIndex, 1)[0]
      );
      return {
        ...state,
        currentIngredients: dragContainer,
      };
    }
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        currentIngredients: [],
        currentBun: []
      };
    default:
      return state;
  }
};
