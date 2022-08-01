import React from 'react';
import { useState, useEffect } from 'react';
import { API, getData, handleResponse } from '../api/api';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngredientsItems, SET_INGREDIENTS_MODAL_ACTIVE, SET_INGREDIENTS_MODAL_INACTIVE, SET_ORDER_MODAL_ACTIVE, SET_ORDER_MODAL_INACTIVE } from '../../services/reducers/burger-ingredients';
import { RESET_INGREDIENT_IN_MODAL, SET_INGREDIENT_IN_MODAL } from '../../services/actions/ingredient-details';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredientsItems());
  }, [dispatch])
  //состояние окна с ингредиентом
  const openIngredientDetails = useSelector(
    (store) => store.burgerIngredients.openIngredientDetails
  );

  //состояние окна с заказом
  const openOrderDetails = useSelector(
    (store) => store.burgerIngredients.openOrderDetails
  );

  console.log(openOrderDetails)


  //состояние текущего ингредиента
  const currentIngredient = useSelector(
    (store) => store.ingredientModal.currentIngredient
  );

  
  //устанавливаю состояние получаемым данным
  //const [data, setData] = useState([]);
  //устанавливаю состояние номеру заказа
  /*const [orderNumber, setOrderNumber] = useState({
    name: '',
    order: {
      number: ''
    },
    success: false
  });*/

  //функция получения данных
  /*function getData() {
    fetch(`${API.url}ingredients`)
      .then(handleResponse) 
      .then((res) => { setData(res.data) }) 
      .catch(err => { console.log(err) }); 
  }*/

  //функция отправки данных о заказе
  /*function getOrder(id) {
    fetch(`${API.url}orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
      .then((res) => setOrderNumber(res))
      .catch(err => { console.log(err) });
  }*/

  //устанавливаю состояние модальным окнам
  //const [openOrderDetails, setOpenOrderDetails] = React.useState(false) //окно заказа закрыто
  //const [openIngredientDetails, setOpenIngredientDetails] = React.useState(false) //окно ингридиента закрыто
  //const [ingredient, setIngredient] = useState(null) //сам ингредиент = не выбран, поэтому null
  //const currentIngredient = useSelector( store => store.ingredientModalReducer.currentIngredient)

  //открывает окно заказа при клике
  const handleOpenOrderDetails = () => {
    dispatch({type: SET_ORDER_MODAL_ACTIVE})
  }

  //закрывает окно заказа при клике
  const handleCloseOrderModal = () => {
    dispatch({type: SET_ORDER_MODAL_INACTIVE})
  }

  //открывает окно ингредиента и устанавливает ингредиент при  клике
  const handleOpenIngredientDetails = (currentIngredient) => {
    dispatch({type: SET_INGREDIENTS_MODAL_ACTIVE})
    dispatch({type: SET_INGREDIENT_IN_MODAL, payload: currentIngredient})
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
            <BurgerIngredients onClick={handleOpenIngredientDetails} />
            <BurgerConstructor onClick={handleOpenOrderDetails} /*getOrder={getOrder}*/ />
        </main>
        
        {openOrderDetails &&             
          <Modal title='' isOpened={openOrderDetails} onClose={handleCloseOrderModal}>
            <OrderDetails /*orderNumber={orderNumber}*/ />
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