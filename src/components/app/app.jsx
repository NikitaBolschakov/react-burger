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

import BurgerIngredientsContext from "../../context/burger-ingredients-context";

function App() {
  //устанавливаю состояние с помощью хука useState
  const [data, setData] = useState([]);

  //функция получения данных
  function getData() {
    fetch(`${API.url}`)
      .then(handleResponse) //если всё ок, обработай ответ
      .then((res) => { setData(res.data) }) //если всё ок, установи данные как состояние
      .catch(err => { console.log(err) }); 
  }

  //получаю данные один раз при загрузке страницы
  useEffect(() => {
    getData()
  }, []) 

  //устанавливаю состояние модальным окнам
  const [openOrderDetails, setOpenOrderDetails] = React.useState(false) //окно заказа закрыто
  const [openIngredientDetails, setOpenIngredientDetails] = React.useState(false) //окно ингридиента закрыто
  const [ingredient, setIngredient] = React.useState(null) //сам ингредиент = не выбран, поэтому null

  //открывает окно заказа
  const handleOpenOrderDetails = () => {
    setOpenOrderDetails(true);
  }

  //открывает окно ингредиента и устанавливает ингредиент
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
      <BurgerIngredientsContext.Provider value={{data, setData}}>
        <AppHeader />
        <main className={styles.content}>
          <BurgerIngredientsContext.Provider value={data}>
            <BurgerIngredients ingredients={ data } onClick={ handleOpenIngredientDetails }/>
            <BurgerConstructor ingredients={ data } onClick={ handleOpenOrderDetails }/>
          </BurgerIngredientsContext.Provider>
        </main>
        
        {openOrderDetails &&             /*если openOrderDetails === true, показать окно заказа */ 
          <Modal title='' isOpened={openOrderDetails} onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        }
  
        {openIngredientDetails &&        /*если openIngredientDetails === true, показать окно ингредиента */ 
          <Modal title='Детали ингредиента' isOpened={openIngredientDetails} onClose={handleCloseModal}>
            <IngredientDetails item={ingredient} />
          </Modal>
        }
      </BurgerIngredientsContext.Provider>
    </div>
  );
}

export default App;