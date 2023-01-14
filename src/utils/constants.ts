import { RootState } from './../services/types/index';
//ws
export const wsOrders = 'wss://norma.nomoreparties.space/orders/all';
export const wsOrdersAuth = 'wss://norma.nomoreparties.space/orders';
//functions for useSelector()
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getIngredients = (store: RootState) => store.burgerIngredients.ingredientItems;
export const getIsEmailForUpdatePassword = (state: RootState) => state.user.updatePasswordStatus;
export const getWsOrders = (store: RootState) => store.wsOrders;
export const getOrders = (store: RootState) => store.wsOrders.orders;
export const getOrderNumber = (store: RootState) => store.orderDetails.orderNumber;
export const getStateCurrentIngredients = (store: RootState) => store.burgerConstructor.currentIngredients;
export const getStateCurrentBun = (store: RootState) => store.burgerConstructor.currentBun;
export const getStateOpenOrderDetails = (store: RootState) => store.burgerIngredients.openOrderDetails;
export const getIsConnected = (store: RootState) => store.wsOrders.wsConnected;
export const getUserData = (state: RootState) => state.user.userData; 