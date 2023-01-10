import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { setIngredientsModalInactive, setOrderModalInactive } from "../../services/actions/burger-ingredients";
import { resetIngredientInModal } from "../../services/actions/ingredient-details";
import { resetNumberInModal } from "../../services/actions/order-details";
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
import OrderPage from "../pages/order-page/order-page";
import { getStateOpenOrderDetails } from "../../utils/constants";
import OnlyUnAuthRoute from "../only-unauth-route/only-unauth-route";
import { useDispatch, useSelector } from "../../services/types/hooks";

const App = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const accessTokenCookie = getCookie("accessToken");
  const refreshTokenCookie = localStorage.getItem('jwt')

  //при загрузке получать ингридиенты
  useEffect(() => {
    dispatch(getBurgerIngredientsItems());
    dispatch(getUser());
    //обновляем состояние в history, 
    //чтобы при обновлении страницы содержимое модального окна было на отдельной странице
    history.replace({ state: null })    
  }, [dispatch]);
  
  //если accessToken протух, а refreshToken есть - обновить токены => запросить пользователя
   useEffect(() => {
    if (!accessTokenCookie && refreshTokenCookie) {
      dispatch(refreshToken());
    }
  }, [dispatch, accessTokenCookie, refreshTokenCookie]); 

  //состояние окна с заказом
  const openOrderDetails = useSelector(getStateOpenOrderDetails);

  //закрывает окно заказа при клике
  const handleCloseOrderModal = () => {
    dispatch(setOrderModalInactive());
    dispatch(resetNumberInModal());
  };

  //закрывает окно ингредиента и удаляет ингредиент при  клике
  const handleCloseIngredientModal = () => {
    dispatch(setIngredientsModalInactive());
    dispatch(resetIngredientInModal());
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <OnlyUnAuthRoute path="/login" exact>
          <Login />
        </OnlyUnAuthRoute>
        <OnlyUnAuthRoute path="/register" exact>
          <Register />
        </OnlyUnAuthRoute>
        <OnlyUnAuthRoute path="/forgot-password" exact>
          <ForgotPassword />
        </OnlyUnAuthRoute>
        <OnlyUnAuthRoute path="/reset-password" exact>
          <ResetPassword />
        </OnlyUnAuthRoute>
        <Route path="/not-found" exact>
          <NotFound />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderPage />
        </Route>
        <ProtectedRoute pathname="/profile">
          <Profile />
        </ProtectedRoute>
      </Switch>

      {background && (
        <>
          <Route path="/ingredients/:id">
            <Modal
              title="Детали ингредиента"
              onClose={handleCloseIngredientModal}
              isOpened
            >
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal onClose={handleCloseIngredientModal} isOpened>
              <OrderPage />
            </Modal>
          </Route>
          <ProtectedRoute path="/profile/orders/:id" exact>
            <Modal onClose={handleCloseIngredientModal} isOpened>
              <OrderPage />
            </Modal>
          </ProtectedRoute>
        </>
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
};

export default App;
