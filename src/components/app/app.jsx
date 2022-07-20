import React from 'react';
import { useState, useEffect } from 'react';
import { API, handleResponse } from '../api/api';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import DataContext from "../../context/burger-ingredients-context";

function App() {
  
  //устанавливаю состояние получаемым данным
  const [data, setData] = useState([]);

  //устанавливаю состояние номеру заказа
  const [orderNumber, setOrderNumber] = useState({
    name: '',
    order: {
      number: ''
    },
    success: false
  });

  //функция получения данных
  function getData() {
    fetch(`${API.url}ingredients`)
      .then(handleResponse) 
      .then((res) => { setData(res.data) }) 
      .catch(err => { console.log(err) }); 
  }

  //функция отправки данных о заказе
  function getOrder(id) {
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
  }

  //получаю данные один раз при загрузке страницы
  useEffect(() => {
    getData()
  }, []) 

  //устанавливаю состояние модальным окнам
  const [openOrderDetails, setOpenOrderDetails] = React.useState(false) //окно заказа закрыто
  const [openIngredientDetails, setOpenIngredientDetails] = React.useState(false) //окно ингридиента закрыто
  const [ingredient, setIngredient] = useState(null) //сам ингредиент = не выбран, поэтому null

  //открывает окно заказа при клике
  const handleOpenOrderDetails = () => {
    setOpenOrderDetails(true);
  }

  //открывает окно ингредиента и устанавливает ингредиент при  клике
  const handleOpenIngredientDetails = (item) => {
    setOpenIngredientDetails(true);
    setIngredient(item);
  }

  //закрывает модальные окна
  const handleCloseModal = () => {
    setOpenOrderDetails(false);
    setOpenIngredientDetails(false);
  }

  return (
    <div className={styles.app}>
      <DataContext.Provider value={data}>
        <AppHeader />
        <main className={styles.content}>
            <BurgerIngredients onClick={handleOpenIngredientDetails}/>
            <BurgerConstructor onClick={handleOpenOrderDetails} getOrder={getOrder} />
        </main>
        {/*----------------------------------- окно заказа ---------------------------------------- */}
        {openOrderDetails &&             
          <Modal title='' isOpened={openOrderDetails} onClose={handleCloseModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        }
        {/*----------------------------------- окно ингредиента ------------------------------------ */}
        {openIngredientDetails &&        
          <Modal title='Детали ингредиента' isOpened={openIngredientDetails} onClose={handleCloseModal}>
            <IngredientDetails item={ingredient} />
          </Modal>
        }
      </ DataContext.Provider>
    </div>
  );
}

export default App;