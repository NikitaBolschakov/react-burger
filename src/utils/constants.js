//ws
export const wsOrders = 'wss://norma.nomoreparties.space/orders/all';
export const wsOrdersAuth = 'wss://norma.nomoreparties.space/orders';

//functions for useSelector()
export const getIsAuth = (state) => state.user.isAuth;
export const getIngredients = (store) => store.burgerIngredients.ingredientItems;
export const getIsEmailForUpdatePassword = (state) => state.user.updatePasswordStatus;
export const getWsOrders = (store) => store.wsOrders;
export const getOrders = (store) => store.wsOrders.orders;
export const getOrderNumber = (store) => store.orderDetails.orderNumber;
export const getStateCurrentIngredients = (store) => store.burgerConstructor.currentIngredients;
export const getStateCurrentBun = (store) => store.burgerConstructor.currentBun;
export const getStateOpenOrderDetails = (store) => store.burgerIngredients.openOrderDetails;
export const getIsConnected = (store) => store.wsOrders.wsConnected;
export const getUserData = (state) => state.user.userData; 