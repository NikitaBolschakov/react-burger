import { TIngredientDetailsActions } from './../actions/ingredient-details';
import { store } from './../../index';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TOrderDetailsActions } from '../actions/order-details';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/ws-actions';

// Типизация всех экшенов приложения
type TApplicationActions = TBurgerConstructorActions | TBurgerIngredientsActions | TOrderDetailsActions 
| TIngredientDetailsActions | TUserActions | TWsActions;

// Типизация стора
export type RootState = ReturnType<typeof store.getState>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

// Типизация thunk в нашем приложении
export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;