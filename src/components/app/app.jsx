import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_INGREDIENTS_MODAL_INACTIVE,
  SET_ORDER_MODAL_INACTIVE,
} from "../../services/reducers/burger-ingredients";
import { RESET_INGREDIENT_IN_MODAL } from "../../services/actions/ingredient-details";
import { RESET_NUMBER_IN_MODAL } from "../../services/actions/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getBurgerIngredientsItems } from "../../services/actions/burger-ingredients";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Profile from "../pages/profile/profile";
import { getUser, refreshToken } from "../../services/actions/user";
import { ProtectedRoute } from "../protected-route/protected-route";
import NotFound from "../pages/not-found/not-found";
import { getCookie } from "../../utils/cookie";
import Feed from "../pages/feed/feed";

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background; 

  const auth = useSelector((state) => state.user.isAuth);
  const tokenUpdated = useSelector((state) => state.user.tokenUpdated);
  console.log(tokenUpdated + "обновлен токен");
  console.log(auth + "авторизован");

  const accessTokenCookie = getCookie('accessToken');
  const refreshTokenCookie = getCookie('refreshToken');

  console.log(accessTokenCookie);
  console.log(refreshTokenCookie);

  //при загрузке получать ингридиенты
  useEffect(() => {
    dispatch(getBurgerIngredientsItems());
    dispatch(getUser());
  }, [dispatch]);

  //если accessToken протух, а refreshToken есть - обновить токены => запросить пользователя
  useEffect(() => {
    if (!accessTokenCookie && refreshTokenCookie) {
      dispatch(refreshToken());
    }
  }, [dispatch, accessTokenCookie, refreshTokenCookie]);


  //состояние окна с заказом 
  const openOrderDetails = useSelector(
    (store) => store.burgerIngredients.openOrderDetails
  );

  //закрывает окно заказа при клике
  const handleCloseOrderModal = () => {
    dispatch({ type: SET_ORDER_MODAL_INACTIVE });
    dispatch({ type: RESET_NUMBER_IN_MODAL });
  };

  //закрывает окно ингредиента и удаляет ингредиент при  клике
  const handleCloseIngredientModal = () => {
    dispatch({ type: SET_INGREDIENTS_MODAL_INACTIVE });
    dispatch({ type: RESET_INGREDIENT_IN_MODAL });
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={ background || location } >
        <Route path="/" exact>
          <div className={styles.app}>
            <main className={styles.content}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </div>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="/not-found" exact>
          <NotFound />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route> 
        <Route path="/feed" exact>
          <Feed />
        </Route> 
        <ProtectedRoute pathname="/profile" exact>
          <Profile />
        </ProtectedRoute>
      </Switch>

      {background && 
        (<Route path="/ingredients/:id" exact>
          <Modal
            title="Детали ингредиента"
            onClose={handleCloseIngredientModal}
          >
            <IngredientDetails />
          </Modal>
        </Route>
        )}
      
      {openOrderDetails && (
        <Modal
          title=""
          isOpened={openOrderDetails}
          onClose={handleCloseOrderModal}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;