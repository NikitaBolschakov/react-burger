import React from 'react';
import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngredientsItems,  SET_INGREDIENTS_MODAL_INACTIVE, SET_ORDER_MODAL_INACTIVE } from '../../services/reducers/burger-ingredients';
import { RESET_INGREDIENT_IN_MODAL } from '../../services/actions/ingredient-details';
import { RESET_NUMBER_IN_MODAL } from '../../services/actions/order-details';

function App() {
  const dispatch = useDispatch();

  //отправляем диспатч с усилителем при загрузке страницы
  useEffect(() => {
    dispatch(getBurgerIngredientsItems());
  }, [])

  //состояние окна с ингредиентом (= false)
  const openIngredientDetails = useSelector(
    (store) => store.burgerIngredients.openIngredientDetails
  );

  //состояние окна с заказом (= false)
  const openOrderDetails = useSelector(
    (store) => store.burgerIngredients.openOrderDetails
  );

  //состояние текущего ингредиента для модального окна
  const currentIngredient = useSelector(
    (store) => store.ingredientModal.currentIngredient
  );

  //закрывает окно заказа при клике
  const handleCloseOrderModal = () => {
    dispatch({type: SET_ORDER_MODAL_INACTIVE})
    dispatch({type: RESET_NUMBER_IN_MODAL});
  }

  //закрывает окно ингредиента и удаляет ингредиент при  клике
  const handleCloseIngredientModal = () => {
    dispatch({type: SET_INGREDIENTS_MODAL_INACTIVE});
    dispatch({type: RESET_INGREDIENT_IN_MODAL});
  }

  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.content}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
        
        {openOrderDetails &&             
          <Modal title='' isOpened={openOrderDetails} onClose={handleCloseOrderModal}>
            <OrderDetails />
          </Modal>
  }
        
        {openIngredientDetails &&        
          <Modal title='Детали ингредиента' isOpened={openIngredientDetails} onClose={handleCloseIngredientModal}>
            <IngredientDetails item={currentIngredient} />
          </Modal>
      }
    </div>
  );
}

export default App;