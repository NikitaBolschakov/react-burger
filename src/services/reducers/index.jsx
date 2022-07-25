import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";

const rootReducer = combineReducers({
  burgerConstructorReducer,
  burgerIngredientsReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
});

export default rootReducer;

//const rootReducer = (state, action) => {
//  todoList: todoList(state.todoList, action),
//  user: user(state.user, action),
//  collaboration: collaboration(state.collaboration, action)
//} 