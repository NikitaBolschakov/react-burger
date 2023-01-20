import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientModalReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";
import { wsReducer } from "./ws-reducer";


const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientModal: ingredientModalReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  wsOrders: wsReducer,
});

export default rootReducer;